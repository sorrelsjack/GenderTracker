import React from 'react';

export const ContactScreen = () => {
    return (
        <div className="fullHeight wrapper">
            <div className="title">
                Contact
            </div>
            <div className="contactContainer">
                <div className="placeholderBox"></div>
                <div className="speech-bubble right contactFormContainer">
                    <div>
                        Etiam cursus quis felis quis ullamcorper. Fusce porta libero ligula, ut mattis arcu hendrerit ac.
                    </div>
                    <form className="contactForm">
                        <label for="nameInput">Name</label>
                        <input type="text" id="nameInput"></input>
                        <label for="emailInput">Email</label>
                        <input type="text" id="emailInput"></input>
                        <label for="subjectInput">Subject</label>
                        <input type="text" id="subjectInput"></input>
                        <label for="messageInput">Message</label>
                        <textarea id="messageInput"></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}