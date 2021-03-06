import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [cardNo, setCardNo] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCvv] = useState();
  const [owner, setOwner] = useState();
  const [err, setErr] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());

  const submitHandler = () => {
    fetch("http://localhost:8080/card", {
      method: "POST",
      body: JSON.stringify({
        CardNumber: cardNo,
        ExpiryDate: expiry,
        CvvCode: cvv,
        CardOwner: owner,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success !== true) {
          setSuccess(undefined);
          setErr(r.err);
        } else {
          setErr(undefined);
          setSuccess("Transaction Successful!");
        }
      });
  };

  return (
    <div className="app">
      <h1>Credit Card Payment Gateway</h1>
      <hr />
      <div className="card">
        <div className="heading">Payment Details</div>
        <div className="img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMtm2NARdxpT-y8pFVhcJPPN3-KwRddcRfQ&usqp=CAU"
            alt=""
          />
        </div>

        <div className="card-no">
          <label>CARD NUMBER</label>
          <br />
          <input
            className="input"
            type="number"
            required
            placeholder="Valid Card Number"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
          />
        </div>
        <div className="expiry">
          <label>EXPIRATION DATE</label>

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setExpiry(date);
            }}
          />
        </div>
        <div className="cv-code">
          <label>CV CODE</label>
          <input
            className="input"
            type="number"
            required
            placeholder="CVC"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <div className="owner">
          <label>CARD OWNER</label>
          <br />
          <input
            className="input"
            type="text"
            required
            placeholder="Card Owner Name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />

          {err ? <div className="error">{err}</div> : null}
          {success ? <div className="success">{success}</div> : null}

          <hr />
          <div className="btn">
            <button onClick={submitHandler}>Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
