import { useState } from "react";

const Navbar = ({ setCategory, setCountry }) => {
    const [selectedCountry, setSelectedCountry] = useState("in"); // default: India

    const handleCountryChange = (code) => {
        setSelectedCountry(code);
        setCountry(code);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><span className="badge bg-light text-dark fs-4">NewsMag</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {["technology", "business", "health", "sports", "entertainment"].map((cat) => (
                            <li className="nav-item" key={cat}>
                                <div className="nav-link" onClick={() => setCategory(cat)}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </div>
                            </li>
                        ))}

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Country
                            </a>
                            <ul className="dropdown-menu">
                                {[
                                    { code: "us", name: "United States" },
                                    { code: "in", name: "India" },
                                    { code: "gb", name: "United Kingdom" },
                                    { code: "ca", name: "Canada" },
                                    { code: "jp", name: "Japan" },
                                    { code: "au", name: "Australia" }
                                ].map((c) => (
                                    <li key={c.code}>
                                        <div
                                            className={`dropdown-item ${selectedCountry === c.code ? "active" : ""}`}
                                            onClick={() => handleCountryChange(c.code)}
                                        >
                                            {c.name}
                                        </div>
                                    </li>
                                ))}

                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <div
                                        className="dropdown-item text-danger"
                                        onClick={() => handleCountryChange("in")}
                                    >
                                        Reset to India
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
