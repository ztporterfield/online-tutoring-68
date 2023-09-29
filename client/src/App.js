import logo from "./logo.svg";
import "./App.css";
import profileImage from "./profile.jpg";

function App() {
  // Generate arrays for hours, minutes, and AM/PM options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const amPmOptions = ["AM", "PM"];

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <h1>Home</h1>
          <h1>Calendar</h1>
          <h1>Jonathan Nguyen</h1>
          <div className="profile-container">
            <img src={profileImage} alt="Profile" width="50" height="50" />
          </div>
        </div>
      </aside>
      <div className="container" style={{ backgroundColor: "white" }}>
        <input type="text" placeholder="Bio" name="bio" required />
        <input type="text" placeholder="Email" name="email" required />
        <input type="text" placeholder="Password" name="password" required />
        <input type="text" placeholder="Courses" name="courses" required />

        {/* Availability input */}
        <div className="availability-container">
          <label htmlFor="availability">Availability:</label>
          <div className="availability-inputs">
            <select name="availability-hour">
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span>:</span>
            <select name="availability-minute">
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select name="availability-am-pm">
              {amPmOptions.map((amPm) => (
                <option key={amPm} value={amPm}>
                  {amPm}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="container">
          <input type="submit" value="Save changes" />
        </div>
      </div>
    </div>
  );
}

export default App;
