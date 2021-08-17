import React from 'react';

interface IProps{}
interface IState{}

let Contact:React.FC<IProps> = ({}) => {
    return(
        <React.Fragment>
            <section className='mt-2'>
                <div className="container">
                    <div className="row">
                        <h3>Contact Us</h3>
                        <p>Please use this contact form to get in touch with the Jing-Dong Stories team with regard to the content published on stories.Jing-Dong.com only. Please note that complaints about products sold on Jing-Dong or customer support emails will not receive a response. For such issues, please tweet to: <span className='fw-bold'>@Jingdongsupport</span></p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <p>Corporate Address </p>
                                </div>
                                <div className="card-body">
                                    <ul className='list-group' >
                                        <li className='list-group-item list-group-item-success'>
                                             <small className='fw-bold'>Jing-Dong Internet Private Limited,</small><br/>
                                             <small className='fw-bold'>Buildings Alyssa, </small><br/>
                                             <small className='fw-bold'>Begonia & Clove Embassy Tech Village,</small><br/>
                                             <small className='fw-bold'>Outer Ring Road Devarabeesanahalli Village, </small><br/>
                                             <small className='fw-bold'> Bengaluru 560103, Karnataka, India</small><br/>
                                             <small className='fw-bold'></small><br/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <p>Postal Address </p>
                                </div>
                                <div className="card-body">
                                    <ul className='list-group' >
                                        <li className='list-group-item list-group-item-success'>
                                             <small className='fw-bold'>Jing-Dong Internet Private Limited,</small><br/>
                                             <small className='fw-bold'>Buildings Alyssa, </small><br/>
                                             <small className='fw-bold'>Begonia & Clove Embassy Tech Village,</small><br/>
                                             <small className='fw-bold'>Outer Ring Road Devarabeesanahalli Village, </small><br/>
                                             <small className='fw-bold'>Bengaluru 560103, Karnataka, India</small><br/>
                                             <small className='fw-bold'>CIN: U51109KA2012PTC066107</small><br/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p className='mt-3'>please contact the Jing-Dong Help Centre or Jing-Dong Customer Care at <span className= 'fw-bold'>1800 202 9898</span></p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default Contact;