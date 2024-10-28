import { create } from "zustand"; //quản lý trạng thái(tạo store)
import { produce } from "immer"; //tạo và thay đổi trạng thái (state)
import { persist, createJSONStorage } from "zustand/middleware"; //các hàm persist và createJSONStorage để lưu trữ trạng thái của cửa hàng Zustand(biến cục bộ)
import AsyncStorage from "@react-native-async-storage/async-storage"; // lưu trữ dữ liệu
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

//lưu trữ dữ liệu bên trong hàm useStore
export const useStore = create(
    persist(
        //Định nghĩa hàm
    //định nghĩa một hàm ẩn danh lấy hai đối số: set và get.
    //Những đối số này có thể là tham chiếu đến các hàm setState và getState, tương ứng, được sử dụng để sửa đổi và truy cập trạng thái của cửa hàng.
       (set,get) => ({
           //định nghĩa một số đối tượng đại diện cho trạng thái ban đầu 
        CoffeeList: CoffeeData,
        BeansList: BeansData,
        CartPrice: 0,
        FavouritesList:[],
        CartList:[],
        OrderHistoryList: [],
        //thêm vào giỏ hàng
      //nhận một đối tượng cartItem chứa thông tin sản phẩm muốn thêm vào giỏ hàng
        addToCart: (cartItem) =>
        set(
            //Hàm bên trong produce nhận state hiện tại làm tham số và trả về state mới.
          produce((state) => {
            //kiểm tra xem sản phẩm có đã tồn tại trong giỏ hàng hay chưa
            let found = false;
            //lặp qua từng sản phẩm trong giỏ
            for (let i = 0; i < state.CartList.length; i++) {
             //ktra xem ID của sản phẩm có trùng với id của sản phẩm muốn thêm không
              if (state.CartList[i].id == cartItem.id) {
             //Nếu trùng thì đánh dấu found là true.
                found = true;
               //kiểm tra từng size của sản phẩm hiện tại
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                     //kiểm tra xem size của hiện tại có trùng với size muốn thêm hay không
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                 //trùng thì trả về true và tăng số lượng sản phẩm trong size và thoát khỏi vòng lặp
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                //nếu không trùng thì thêm size mới vào mảng prices[]
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                     //sắp xếp lại mảng prices
                state.CartList[i].prices.sort((a, b) => {
                    //nếu size của thg a > b thì return -1 nghĩa là đặt a trc b
                  if (a.size > b.size) {
                    return -1;
                  }
                      //nếu size của thg a < b thì return 1 nghĩa là đặt a sau b
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
        calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
              //lặp qua từng sản phẩm trong giỏ hàng
            for (let i = 0; i < state.CartList.length; i++) {
                //lưu trữ giá của sản phẩm hiện tại
              let tempprice = 0;
                //duyệt qua từng size của mảng
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                //tính tổng giá trị
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *//Lấy giá của sản phẩm và chuyển thành số thực (float)
                    state.CartList[i].prices[j].quantity;//Lấy ra số lượng của sản phẩm hiện tại
              }
              //Cập nhật giá trị của sản phẩm vào state
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              //Cộng giá trị của sản phẩm hiện tại vào tổng giá trị
              totalprice = totalprice + tempprice;
            }
               //Cập nhật tổng giá trị vào state CartPrice
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),

         //thêm vào trang danh sách yêu thích
        //truy xuất và lấy ra type và id của Coffee
    addToFavouriteList:(type, id) => set(produce(state=>{
       if(type == 'Coffee') {
        //lặp qua từng sản phẩm của type Coffee
        for(let i =0; i<state.CoffeeList.length; i++){
            //Kiểm tra xem ID của sản phẩm hiện tại có trùng với ID truyền vào hay không
            if(state.CoffeeList[i].id == id ){
                //Kiểm tra xem sản phẩm hiện tại có đã được yêu thích hay chưa.
                if(state.CoffeeList[i].favourite == false){
                  //nếu đã đc thêm vào thì trả về true
                    state.CoffeeList[i].favourite = true;
                   //Thêm sản phẩm hiện tại vào đầu danh sách yêu thích
                    state.FavouritesList.unshift(state.CoffeeList[i]);
                }
                break;
            }
        }
       }else if(type == 'Bean') {
        for(let i =0; i<state.BeansList.length; i++){
            if(state.BeansList[i].id == id ){
                if(state.BeansList[i].favourite == false){
                    state.BeansList[i].favourite = true;
                    state.FavouritesList.unshift(state.BeansList[i]);
                }
                break;
            }
        }
    }
    }),
    ),
    deleteFromFavouriteList:(type, id) => 
    set(produce(state => {
        if(type == "Coffee") {
             for(let i =0; i<state.CoffeeList.length; i++){
                 if(state.CoffeeList[i].id == id ){
                     if(state.CoffeeList[i].favourite == true){
                        state.CoffeeList[i].favourite = false;
                    }
                     break;
                }
            }
        }else if(type == 'Bean') {
            for(let i =0; i<state.BeansList.length; i++){
                if(state.BeansList[i].id == id ){
                    if(state.BeansList[i].favourite == true){
                        state.BeansList[i].favourite = false;
                    }
                    break;
                }
            }
        }
        //tìm kiếm và xóa một phần tử từ mảng FavouritesList dựa trên id được truyền vào.
        let spliceIndex = -1;
        for(let i=0; i<state.FavouritesList.length; i++){
          if(state.FavouritesList[i].id == id){
            spliceIndex = i;
            break;
          }
        }
        state.FavouritesList.splice(spliceIndex,1);
    }),
    ),
    incrementCartItemQuantity: (id, size) =>
    set(
      produce(state => {
        //lặp qua từng sản phẩm trong cart
        for (let i = 0; i < state.CartList.length; i++) {
               //nếu như id lấy ra bằng với id trong cart
          if (state.CartList[i].id == id) {
            for (let j = 0; j < state.CartList[i].prices.length; j++) {
               //nếu như size lấy ra bằng với size trong cart
              if (state.CartList[i].prices[j].size == size) {
               //tăng số lượng vòng lặp và thoát khỏi chương trình
                state.CartList[i].prices[j].quantity++;
                break;
              }
            }
          }
        }
      }),
    ),
  decrementCartItemQuantity: (id, size) =>
    set(
      produce(state => {
        for (let i = 0; i < state.CartList.length; i++) {
          if (state.CartList[i].id == id) {
            for (let j = 0; j < state.CartList[i].prices.length; j++) {
              if (state.CartList[i].prices[j].size == size) {
                if (state.CartList[i].prices.length > 1) {
                  if (state.CartList[i].prices[j].quantity > 1) {
                    state.CartList[i].prices[j].quantity--;
                  } else {
                    state.CartList[i].prices.splice(j, 1);
                  }
                } else {
                  if (state.CartList[i].prices[j].quantity > 1) {
                    state.CartList[i].prices[j].quantity--;
                  } else {
                    state.CartList.splice(i, 1);
                  }
                }
                break;
              }
            }
          }
        }
      }),
    ),
   
    addToOrderHistoryListFromCart: () =>
    set(
      produce(state => {
        //Sử dụng phương thức reduce để tính tổng giá trị của tất cả các mục trong giỏ 
        //Hàm reduce này tính tổng giá trị của mỗi ItemPrice (giá trị của mỗi mục trong giỏ hàng) và gán vào biến temp.
        let temp = state.CartList.reduce(
          (accumulator, currentValue) =>
            accumulator + parseFloat(currentValue.ItemPrice),
          0,
        );
        //kiểm tra xem lịch sử đơn hàng có chứa ít nhất 1 đơn hàng hay không
        if (state.OrderHistoryList.length > 0) {
          //Nếu có ít nhất một đơn hàng trong lịch sử đơn hàng, thêm một đơn hàng mới vào đầu mảng OrderHistoryList.
          //Đơn hàng mới này bao gồm ngày đặt hàng (OrderDate), danh sách mục trong giỏ hàng (CartList), và tổng giá trị của giỏ hàng (CartListPrice).
          state.OrderHistoryList.unshift({
            OrderDate:
              new Date().toDateString() +
              ' ' +
              new Date().toLocaleTimeString(),
            CartList: state.CartList,
            CartListPrice: temp.toFixed(2).toString(),
          });
          //Nếu lịch sử đơn hàng rỗng (không có đơn hàng nào trước đó), thêm một đơn hàng mới vào cuối mảng OrderHistoryList.
        } else {
          state.OrderHistoryList.push({
            OrderDate:
              new Date().toDateString() +
              ' ' +
              new Date().toLocaleTimeString(),
            CartList: state.CartList,
            CartListPrice: temp.toFixed(2).toString(),
          });
        }
        //Sau khi chuyển các mục từ giỏ hàng sang lịch sử đơn hàng, đặt giỏ hàng (CartList) về trạng thái rỗng bằng cách gán một mảng trống cho nó.
        state.CartList = [];
      }),
    ),
}),
       {
        name: 'coffee-app', 
        storage:createJSONStorage(()=>AsyncStorage)
    }),
)