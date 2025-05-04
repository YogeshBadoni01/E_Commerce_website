import React, { useState } from "react";
// import  contactImg  from  "../utils/Images/e_commerce/Contact_us/contact_us.jpg"
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ContactUs } from "../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Redux/reducers/snackbarSlice";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [buttonDisable, setbuttonDisable] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState("");

  
  const dispatch =  useDispatch()
  
  

  const handleContactUs = async () => {

    setbuttonLoading(true)
    setbuttonDisable(true)
    await ContactUs({name,email,subject,message})
    .then( () => {
      // setFormData(res.data)
      setLoading(false);
    })
    .catch((err) => {
        //  console.log(name,email,subject,message)
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error",
              })
            );
            setLoading(false);
          });
    
    // setLoading(false)
    setbuttonLoading(false)
    setbuttonDisable(false)
  };
  
  return (
    <div className="w-full max-w-[1200px] flex  m-auto  rounded-lg bg-theme-contactUs">
      <div className="flex-12 p-5 ">
        <h1 className="text-2xl mb-5">Contact Us </h1>
        <div className="flex flex-col gap-7">
          <TextInput
            placeholder="Name"
            label="Name"
            value={name}
            name={name}
            handelChange={(e) => {
              setName(e.target.value);
            }}
          />
            <TextInput
              placeholder="Email"
              label="Email"
              value={email}
              handelChange={(e) => setEmail(e.target.value)}
            />
          <TextInput
            placeholder="subject"
            label="Subject"
            value={subject}
            handelChange={(e) => setSubject(e.target.value)}
          />

          <TextInput
            label="Your Message"
            placeholder="Type your message here..."
            name="message"
            value={message}
            handelChange={(e) => setMessage(e.target.value)}
            textArea={true} 
            rows={5} 
            cols={30} 
            error={false} 
          />

          <Button
            text="Send"
            isLoading={buttonLoading}
            isDisabled={buttonDisable}
            onClick={handleContactUs}
          />
        </div>
      </div>
      <div className="flex-08 max-[780px]:hidden">
        {/* <img src={contactImg} alt="" /> */}
        <img
          src="https://media.istockphoto.com/id/617893290/photo/modern-keyboard-wih-contact-us-button.jpg?s=612x612&w=0&k=20&c=J_z4SI4gwIfTNmXELB7A9jXaZp-BjnZav1d_bjUVeAM="
          alt=""
          className="object-cover h-full w-full rounded-lg "
        />
      </div>
    </div>
  );
};

export default Contact;
