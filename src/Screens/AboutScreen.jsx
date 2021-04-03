import React from 'react';
import '../../styles.css'

export const AboutScreen = () => {
    return (
        <div className="fullHeight wrapper">
            <div className="title">
                About
            </div>
            <div className="personInfoContainer">
                <div className="personInfo speech-bubble">
                    Hello! My name is Nara and I'm a very cool deerveloper. :) I'm also a massive furry.
            <p>I came up with the concept for this website and created the first iteration of it as a fun side project.
                    I am new to deerveloping for the web, as in my personal life, I work as a mobile app deerveloper and
                    typically work with React Native. I started working on this site because I wanted to help my friend out
                and learn more about HTML and CSS along the way!</p>
                    <p>Fun fact about me -- I first became interested in the creation of websites as a kid when I made Neopets
                web pages!</p>
                </div>
                <img className="personPictureContainer" src="../assets/nara.png"></img>
            </div>
            <div className="personInfoContainer">
                <div className="personInfo speech-bubble">Hello there. This is placeholder text! Cras nunc justo, volutpat eget
                tempor nec, mattis vitae ante. Etiam ac dictum neque, et maximus turpis. Orci varius natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Maecenas et condimentum nisl, non tempus tellus.
                Vivamus quis semper ante. Curabitur purus mi, venenatis eget nulla eget, efficitur egestas ipsum. Nullam
                dictum non ligula eu laoreet. Mauris quis consequat nisl, ut rutrum purus. Nam facilisis vitae dolor sit
                amet sagittis. Fusce vel urna non arcu euismod bibendum eget ut diam. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Aenean libero libero, varius ac pharetra vitae, posuere
                non dui. Integer posuere neque eget risus ullamcorper, a venenatis urna hendrerit. Nunc non facilisis
            ligula, in congue eros.</div>
                <img className="personPictureContainer" src="../assets/captain.png"></img>
            </div>
            <div className="footer">
                <a className="vintagecoyote" href="https://twitter.com/vintagecoyote">Art on this page is by @vintagecoyote on Twitter!</a>
            </div>
        </div>
    )
}