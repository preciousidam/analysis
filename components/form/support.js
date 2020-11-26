import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InputWithLabel } from "../input"
import '../../styles/form.scss';
import { RoundedButton } from "../button";


export const SupportForm = ({}) => {

    return (
        <div>
            <form id="supportForm">
                <div className="row">
                    <div className="col-md-6">
                        <InputWithLabel
                            label={<span><FontAwesomeIcon />Fullname</span>}
                            id="fullname"
                            type="text"
                            name="fullname"
                        />
                    </div>
                    <div className="col-md-6">
                        <InputWithLabel 
                            label={<span><FontAwesomeIcon />Email</span>}
                            id="fullname"
                            type="email"
                            name="email"
                        />
                    </div>
                    <div className="col-md-12">
                        <InputWithLabel 
                            label={<span><FontAwesomeIcon />Subject</span>}
                            id="subject"
                            type="text"
                            name="subject"
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="message"><span><FontAwesomeIcon />Message</span></label>
                        <textarea id="message" rows={7} />
                    </div>
                </div>
                <RoundedButton
                    text="Submit"
                    id="submit"
                    onClick={_ => console.log('submit')}
                />
            </form>
        </div>
    )
}
