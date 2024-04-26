import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { NavLink, useNavigate } from 'react-router-dom';

import './Home.css'

import axios from 'axios';
function Home() {
    
    const [show, setShow] = useState(false);  
    const handleClose = () => {
        setShow(false);
    }  
    let navigate = useNavigate();
    const handleShow = () => setShow(true); 

    let [isUser, setisUser] = useState(false);
    let sample1=()=>{
        // axios.post("http://localhost/user-api/verify",{token:localStorage.getItem("token")})
        // .then((res)=>{
        //      if(res.data.message==="success")navigate("/book")
        //      else handleShow()
        // })
        // .catch((err)=>{
        //             console.log(err)
    //})
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3500/user-api/verify", { token: token })
      .then((res) => {
        if (res.data.message!== "success") {
         // localStorage.clear();
          
           handleShow();
        } else {
          const user = localStorage.getItem("username");
          navigate('/book')
        }
      })
      .catch((err) => alert("Error: " + err.message));
    }

  return (
    <div className='app1'>

        {/* <div className='fun1 text-center mb-5 mt-3'><h3>Connecting Movements,Creating Memories!!</h3></div> */}
        <Carousel fade className='rounded-5  cur1'>
        <Carousel.Item interval={1000} >
            <img
            className="d-block w-100  demo"
            src="https://content.jdmagicbox.com/comp/mysore/t6/0821px821.x821.220222153619.h6t6/catalogue/srk-event-management-vijaynagar-4th-stage-mysore-photographers-p1lg7qaaye.jpg" style={{height:'530px'}}
            alt="First slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
            <img className="d-block w-100 demo"
            src="https://dgmc.org.in/wp-content/uploads/2021/04/pexels-wendy-wei-1190297.jpg"  style={{height:'530px'}}
            />
            <Carousel.Caption>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
            <img
            className="d-block w-100 demo"
            src="https://wallpapercave.com/wp/wp7488228.jpg" style={{height:'530px'}}
            alt="Third slide"
            />
            <Carousel.Caption>    
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
       
        

        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Slot Requested</Modal.Title>
              </Modal.Header>
              <Modal.Body>Unauthorized access!! Please Login first</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            <h1 className='text-center mt-5 w1 fun1 fun2 text-black'>Pool of Events.!</h1>
            
        <div className='m-auto mt-5  container '>
        <div className="row row-cols-md-2 row-cols-lg-3 w-75 m-auto mt-5 text-center ">
        <div className="mt-2 h-50 w1  ">
            <div className="col card shadow ">
                <div className="card-header rounded p-0">
                    <img src=" https://tse4.mm.bing.net/th?id=OIP.kDVmWiLL5T99WvjRu12M1gHaDI&pid=Api&P=0"
                    alt="image not found" className="w-100 rounded sample" height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2>
                        Wedding</h2></div>
                     <p>
                        Our team of experienced event planners will handle every detail, from venue selection to decor and entertainment, to ensure a enjoyable wedding.
                     </p>

                </div>
            </div>
        </div>
        <div className="col mt-2 h-50 w1">
            <div className="card shadow  ">
                <div className="card-header rounded p-0">
                    <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                    alt="image not found" className="w-100 rounded sample"  height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2 >
                        Meeting</h2></div>
                     <p>
                     From venue selection to audiovisual equipment and catering, we'll take care of every detail to create a seamless and engaging.
                     </p>
                     
                </div>
            </div>
            
        </div>
        <div className="col mt-2 h-50 w1">
            <div className="card shadow">
                <div className="card-header rounded p-0">
                    <img src="https://i.etsystatic.com/18016477/r/il/109524/2182250841/il_1140xN.2182250841_4isj.jpg" 
                    alt="image not found" className="w-100 rounded sample" height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2>
                        Birthday</h2></div>
                     <p>
                     From kids' parties to milestone birthdays, we'll take care of everything from invitations to entertainment,  enjoy your celebration to the fullest.
                     </p>
                     
                </div>
            </div>
            
        </div>
        <div className="col mt-2 h-50 w1">
            <div className="card shadow ">
                <div className="card-header rounded p-0">
                    <img src="https://buzzharmony.com/wp-content/uploads/2016/02/festivalfeat.jpg" 
                    alt="image not found" className="w-100 rounded sample"  height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2>
                        Concerts</h2></div>
                     <p>
                     With a team of experienced professionals and access <br/> to the latest technology and equipment.
                     </p>
                </div>
            </div>
            
        </div>
        <div className="col mt-2 h-50 w1">
            <div className="card shadow ">
                <div className="card-header p-0 rounded">
                    <img src="https://www.25cineframes.com/images/gallery/2015/07/cinemaa-awards-function-event-2015-hd-photos/04.jpg" 
                    alt="image not found" className="w-100 rounded sample" height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2>
                        Cine Awards
                    </h2>
                    </div>
                     <p>
                     Lights, camera, action! Our cine awards event management services will help you create a glamorous guests.
                     </p>
                     
                </div>
            </div>
            
        </div>
        <div className="col mt-2 h-50 w1">
            <div className="card shadow ">
                <div className="card-header rounded p-0">
                <img src="https://c4.wallpaperflare.com/wallpaper/160/159/676/model-the-show-kendall-jenner-kendall-jenner-wallpaper-preview.jpg" 
                    alt="image not found" className="w-100 rounded sample "  height={175}/>
                </div>
                <div className="card-body">
                    <div className="fs-3 fun1"><h2>
                        Fashion Shows</h2></div>
                     <p>
                     From runway design to lighting and music, we'll create a stunning showcase that highlights your brand's unique.
                     </p>
                     
                </div>
            </div>
            
        </div>

        </div>
        </div>
        <div className=' fixed-bottom mb-3'>
            
            <button className='btn  btn-success rounded-3 hello opacity-100 border-light p-2'   onClick={sample1} >
                Book Here
            </button>
        
        </div> 

        <h1 className='text-center mt-5 w1 fun1 fun2 text-black'>Committees..!</h1>


        <div className="   d-flex align-items-center">
          <div className=" img1 p-4 ">
         
            <img src="https://www.cvent.com/sites/default/files/image/2019-10/iStock-855485092.png" className="img-fluid rounded-5 image1" alt="Placeholder" width="750px" height="500px" />
          </div>
            <div className="test2">
            <div className="fs-3 w4  mx-auto   fun1">Planning Committee</div>
                <p>
                A planning committee is a group of individuals responsible for organizing and managing an event. The committee is formed by the event organizers.
                
                <h5>Contact Details :</h5>📞 9219199129<br /> 📞 9245367121<br />
                ✉ ravi2041@gmail.com</p>
            </div>
        </div>
        <br></br>
        <div className="   d-flex align-items-center">
         
            <div className="test2">
            <div className="fs-3 w4  mx-auto   fun1">Decoration Committee</div>
            <p>
                The visual and aesthetic components of an event are designed and carried out by the Decorating Committee and designing team.<br /><br />
                <h5>Contact Details :</h5>📞 9219199134<br /> 📞 9245367156<br />
                ✉ shiva_kushi20@gmail.com
              </p>
            </div>
            <div className=" img2 p-4 ">
            <img src="https://resurrectionct.org/wp-content/uploads/2020/04/IMG_7476-1-1024x768.jpeg" className="img-fluid rounded-5 image1" alt="Placeholder" width="700px" height="px"  />
          </div>
        </div>
        <br></br>
        <div className="   d-flex align-items-center">
          <div className="  img3 p-4 ">
         
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXZ1m4XTwT_hlyQYelOpfla6iNUjsAlZp-w&usqp=CAU" className='rounded-5' width="380px" height="250px"/>
          </div>
            <div className="test3">
            <div className="fs-3 w4  mx-auto   fun1">Media Committee</div>
            <p>
                In order to guarantee that an event receives sufficient media coverage and  the Media and PR Committee is in charge of managing the public image.<br /><br />
                <h5>Contact Details: </h5>📞 9219199125<br /> 📞 9245367132<br />
                ✉ manoj_kumar@gmail.com
              </p>
            </div>
        </div>
        
       {/* // <Footer className="fixed-bottom"/> */}
        </div>
  );
}

export default Home;

