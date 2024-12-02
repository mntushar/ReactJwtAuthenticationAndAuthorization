import TokenHandler from "../utility/TokenHandler";
import {useNavigate} from "react-router-dom";
import Utility from "../utility/Utility";
import AppInfo from "../utility/AppInfo";

class AuthenticationHandler{
    #tokenHandler = new TokenHandler();
    #navigate = new useNavigate();
    #utility = new Utility();

    async getToken(){
        try {
            let result = await this.#tokenHandler.getValidAccessToken();
            if (!result.isSuccess) {
                this.#navigate(AppInfo.loginUrl);
                throw new Error(result.message);
            }
            return result;
        } catch (err) {
            console.log(this.#utility.getError(err));
        }
    }
}

export default AuthenticationHandler