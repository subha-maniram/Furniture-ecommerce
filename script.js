/**first slider */
$(".slider-one")
  .not(".slick-intialized")//using this function for initialize the slider .this porperty not there we cant use .slick
  .slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true, //for bottom dot
    centralized: true,
    prevArrow: ".site-slider .slider-btn .prev",
    nextArrow: ".site-slider .slider-btn .next",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow1: 1,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        }
      }
    ]
  });


// /**SECOND slider */
// $(".slider-two")
// .not(".slick-intialized")//using this function for initialize the slider .this porperty not there we cant use .slick
// .slick({
//     prevArrow:".site-slider-two .prev",
//     nextArrow:".site-slider-two .next",
//     slidesToShow:5,
//     slideToScroll:1,
//     autoplaySpeed:3000
// });

$('.slider-two')
  .slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: ".site-slider-two .prev",
    nextArrow: ".site-slider-two .next",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


/* third slider*/
$('.slider-three')
  .slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: ".site-slider-three .prev",
    nextArrow: ".site-slider-three .next",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });



//open$close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#cart-close');

cartIcon.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('active');
});

//---start when the document is ready---

if (document.readyState = "loading") {  //checking the loading of the doucment and for DOM content updation purpose.
   document.addEventListener('DOMContentLoaded', start);
}
else {
  start();
}

//----start----
function start() {
  addEvents();
}

//---update & rerender---
function update() {
  addEvents();
  updateTotal();
}

//---add events----

function addEvents() {
  //----remove items from cart----
  let cartRemove_btn = document.querySelectorAll('.cart-remove');
  console.log(cartRemove_btn);
  cartRemove_btn.forEach(btn => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // --change item quantity----
  let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
  cartQuantity_inputs.forEach(input => {
    input.addEventListener("change", handle_changeQuantity);
  });

  //--add item to cart--
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach(btn => {
    btn.addEventListener("click", handle_addCartItem);
  });



}

//---handle event function----

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".pro-title").innerHTML;
  let price = product.querySelector(".pro-price").innerText;
  let imgsrc = product.querySelector(".img-fluid").src;
  console.log(title, price, imgsrc);


  let newToAAdd = {
    title,
    price,
    imgsrc,
  };


  //add product to cart
  let cartBoxElement = CartBoxcomponent(title, price, imgsrc);
  let newMode = document.createElement("div");
  newMode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newMode);

  update()  //if this function add total amount calcuulate
}

function handle_removeCartItem() {
  this.parentElement.remove();

  update();
}


function handle_changeQuantity() {
  if (isNaN(this.value) || this.value < 1) {  //for this count start from 0
    this.value = 1;
  }
  this.value = Math.floor(this.value);//to keep it integer

  update();

}



//----update and rerender function---

function updateTotal() {
  let cartBoxes = document.querySelectorAll('.cart-box');
  const totalElement = cart.querySelector('.total-price');
  let total = 0;
  cartBoxes.forEach(cartBox => {
    let priceElement = cartBox.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector('.cart-quantity').value;
    total += price * quantity;
  });

  //keep 2 digit after the decimal points
  total = total.toFixed(2);
  //or you can use also
  // total=Math.round(total*100) / 100;

  totalElement.innerHTML = "$" + total;
}


//---html component---
function CartBoxcomponent(title, price, imgsrc) {
  return `<div class="cart-box">
                 <img src=${imgsrc} alt="" class="cart-img">
                  <div class="detail-box">
                  <div class="cart-product-title">${title} </div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity">
                  </div>
                  <!--remove cart-->
                  <i class="fa-solid fa-trash cart-remove"></i>

                  </div>`

}





