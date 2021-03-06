import { useState } from "react";
import PaymentMobilePay from "./PaymentMobilePay";
import PaymentCreditCard from "./PaymentCreditCard";

export default function PaymentModal (props) {
    const [activePayment, setActivePayment] = useState("");

    function changePaymentMethod (e) {
        const paymentMethod = e.currentTarget.dataset.payment;
        
        setActivePayment(paymentMethod);
    }
    
    function validateForm () {
      const form = document.querySelector("#form-credit-card");

      form.classList.add("submitted");
  
      if (form.checkValidity()) {
        props.setOrderDisplay(prevState => !prevState)
      }
    }
    

    return (
        <div id="modal-payment" className={`basket-inner ${props.paymentDisplay ? "" : "slide-hidden"}`}>
            <div className="modal-payment-content">
                <div className="modal-payment-content-selector">
                    <h3>Choose a payment method</h3>
                    <div className="modal-payment-options">
                        <div className={`modal-payment-option ${activePayment === "mobile-pay" && "active-payment"}`} data-payment="mobile-pay" onClick={changePaymentMethod}>
                            <img className="modal-payment-option-image" src={`./images/payment/mobile-pay-icon-${activePayment === "" ? "vertical" : "horisontal"}.svg`} alt="MobilePay payment icon" />
                        </div>
                        <div className={`modal-payment-option ${activePayment === "credit-card" && "active-payment"}`} data-payment="credit-card" onClick={changePaymentMethod}>
                            <img className="modal-payment-option-image" src={`./images/payment/credit-card-icon-${activePayment === "" ? "vertical" : "horisontal"}.svg`} alt="Credit card payment icon" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="modal-payment-content-form">
                    {activePayment === "mobile-pay" && <PaymentMobilePay setOrderDisplay={props.setOrderDisplay} />}
                    {activePayment === "credit-card" && <PaymentCreditCard />}
                </div>
            </div>
            <div className="modal-payment-buttons">
                <button onClick={ () => {props.setPaymentDisplay(prevState => !prevState)}}><img src="./images/icons/icon-return.svg" alt="Foobar return to beer grid icon" /></button>
                { activePayment === "credit-card" && <button className="continue-button" onClick={validateForm}>Continue</button>}
            </div>
        </div>
    )
}