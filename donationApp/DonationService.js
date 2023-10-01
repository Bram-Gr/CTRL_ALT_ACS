import axios from "axios";

export default {
     createUser(User){
        return axios.post(`/user`,User)
     },
     makeDonation(Donation){
        return axios.post(`/donations`, Donation)
     },
     getDonationByDonationId(donationId){
        return axios.get(`/get-donations/${donationId}`)
     }


}