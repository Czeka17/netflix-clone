import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function Footer(){
    const getCurrentYear = () => {
        const date = new Date();
        return date.getFullYear();
    }

    const currentYear = getCurrentYear();

    return(
        <section className="h-[150px] bg-red-700 text-white mt-10">
            <div className="py-6">
                <ul className="flex flex-row justify-evenly items-center">
                <li className="p-2 hover:text-neutral-900 duration-300"><a className="flex flex-row justify-center items-center" href="https://github.com/Czeka17" target="_blank"><AiFillGithub className="text-3xl mx-2" />Czeka17</a></li>
                <li className="p-2 hover:text-neutral-900 duration-300"><a className="flex flex-row justify-center items-center" href="https://www.linkedin.com/in/jakub-czekański-5562b0260/" target="_blank"><AiFillLinkedin className="text-3xl mx-2" />Jakub Czekański</a></li>
                </ul>
            </div>
            <hr/>
            <p className="flex justify-center items-center py-4">&copy; {currentYear} Jakub Czekański</p>
        </section>
    )
}

export default Footer;