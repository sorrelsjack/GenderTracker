import React from 'react';
import '../../styles.css'

export const ContactScreen = () => {
    return (
        <div class="fullHeight wrapper">
            <div class="title">
                Contact
            </div>
            <div class="contactContainer">
                <div class="placeholderBox"></div>
                <div class="speech-bubble right contactFormContainer">
                    <div>
                        Etiam cursus quis felis quis ullamcorper. Fusce porta libero ligula, ut mattis arcu hendrerit ac.
                    </div>
                    <form class="contactForm">
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