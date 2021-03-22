import decode from 'jwt-decode'

class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in
    loggedIn() {
        //checks if there is a saved token and still valid
        const token = this.getToken();

        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    getToken() {
        //get user token from localstorage
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        //Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    logout() {
        //clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();