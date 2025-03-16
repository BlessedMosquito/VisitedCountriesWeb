import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate(); // Musi byæ wewn¹trz komponentu!

    const handleRoute = () => {
        navigate("/search");
    };

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={handleRoute}>Search</button>
        </div>
    );
}
