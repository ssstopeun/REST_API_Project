import React, {useState} from "react";
import swal from 'sweetalert';

export function Order({orders = [], onOrderEmail}) {
    const [email, setEmail] = useState({
        orderEmail: ""
    });
    const handleEmailInputChanged = (e) => setEmail({...email, orderEmail: e.target.value})

    const handleEmail = (e) => {
        if (email.orderEmail === "") {
            swal('조회 실패!',"이메일을 입력해주세요!",'warning');
        } else {
            onOrderEmail(email);
        }
    }


    return (
        <>
            <hr />
            <h5 className=" text-start">주문내역 확인하기</h5>


            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input type="email" className="form-control mb-1" value={orders.orderEmail} onChange={handleEmailInputChanged}
                           id="email"/>
                </div>

            </form>
            <button className="btn btn-dark col-12" onClick={handleEmail}>주문내역 확인하기</button>
            <hr />

        </>
    )
}