import { User } from '@/model/user';
import axios from 'axios';
import Cookies from 'cookies-js';

export async function reduzirTicket(user: User, tickets: {qtd_interview: number, qtd_resume: number, qtd_analyze: number}){
    try {
        const response = await axios.post(`/api/user/${user.id}`, {
            credits_interview: user.credits_interview - tickets.qtd_interview,
            credits_resume: user.credits_resume - tickets.qtd_resume,
            credits_analyze: user.credits_analyze - tickets.qtd_analyze,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}