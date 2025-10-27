import { useNavigate } from "react-router-dom";
import { adminPath } from "./common/hooks/urlManager";

export default function MainPage() {

    const navigate = useNavigate();
    const shoot_addPostPage_btn = () => navigate(adminPath.addQuizPage);

    return (
        <div>
            <h1>Main Page</h1>
            <button onClick={shoot_addPostPage_btn}>Go to Add Quiz Page</button>
        </div>
    );
}