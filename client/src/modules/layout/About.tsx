import React from 'react';

interface IProps{}
interface IState{}

let About:React.FC<IProps> = ({}) => {
    return(
        <React.Fragment>
            <section className='mt-2'>
                <div className="container">
                    <div className="row">
                        <h3>About Us</h3>
                        <p>We are maximisers. We're out on our own journeys to maximise - be the best at what we choose and care about the most - whether it be our impact, voice, potential, ideas, influence, well-being or more. Because when we maximise ourselves in our inclusive teams, Jing-Dong is able to deliver the best imaginable value for our customers, stakeholders and the planet!</p>
                    </div>
                </div>
            </section>
            <section className='mt-2'>
                <div className="container">
                    <div className="row">
                        <h3 className='fw-bold'>Leave a Mark</h3>
                        <p>We're known more by the impact we create than the titles we hold. Impact that is brought by working together on audacious challenges at scale
                            with an aim to revolutionize for the Indian customer.
                            We believe great ideas can emerge from anywhere and must be backed. Our people - backed by our culture of end-to-end ownership - have revolutionised India's e-commerce sector - several times over!</p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default About;