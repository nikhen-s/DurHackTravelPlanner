import { Button, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import './Form.styles.css'

const Form = () => {
  const [activeStep, setActiveStep] = useState(0) 
  const [formComplete, setFormComplete] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const handleNext = (e) => {
    e.preventDefault()
    setActiveStep(activeStep => activeStep + 1)
  }

  const handleBack = (e) => {
    e.preventDefault()
    setActiveStep(activeStep => activeStep - 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {activeStep === 0 && (
         <fieldset>
         <h1 className="section-heading">What season do you like?</h1>
         <div style={{ display: "inline-flex", gap: "1em" }}>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               value="Spring"
               {...register("season", { required: true })}
             />
             <label htmlFor="spring">Spring</label>
           </div>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               value="Summer"
               {...register("season", { required: true })}
             />
             <label htmlFor="summer">Summer</label>
           </div>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               value="Autumn"
               {...register("season", { required: true })}
             />
             <label htmlFor="autumn">Autumn</label>
           </div>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               id="winter"
               value="Winter"
               {...register("season", { required: true })}
             />
             <label htmlFor="winter">Winter</label>
           </div>
         </div>
         </fieldset>
      )}
  
      {activeStep === 1 && (
        <fieldset>
        <h1>What type of weather are you expecting?</h1>
        <div style={{ display: "inline-flex", gap: "1em" }}>
          <div>
            <input
              style={{ cursor: "pointer" }}
              type="radio"
              value="cold"
              {...register("weather", { required: true })}
            />
            <label htmlFor="cold">Cold</label>
          </div>
          <div>
            <input
              style={{ cursor: "pointer" }}
              type="radio"
              id="mild"
              value="Mild"
              {...register("weather", { required: true })}
            />
            <label htmlFor="mild">Mild</label>
          </div>
          <div>
            <input
              style={{ cursor: "pointer" }}
              type="radio"
              id="hot"
              value="Hot"
              {...register("weather", { required: true })}
            />
            <label htmlFor="hot">Hot</label>
          </div>
        </div>
        </fieldset>
      )}
      
      {activeStep === 2 && (
              <fieldset>
              <h1>What is your budget range?</h1>
              <div style={{ display: "inline-flex", gap: "1em" }}>
                <label htmlFor="budget">Budget</label>
                <input
                  type="range"
                  id="budget"
                  name="budget"
                  min="100"
                  max="5000"
                  step="100"
                  {...register("budget", { required: true })}
                />
              </div> 
            </fieldset>
      )}

      {activeStep === 3 && (
         <fieldset>
         <h1>Would you like a coastal location?</h1>
         <div style={{ display: "inline-flex", gap: "1em" }}>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               id="yes"
               value="true"
               {...register("coastal", { required: true })}
             />
             <label htmlFor="yes">Yes</label>
           </div>
           <div>
             <input
               style={{ cursor: "pointer" }}
               type="radio"
               id="no"
               value="false"
               {...register("coastal", { required: true })}
             />
             <label htmlFor="no">No</label>
           </div>
         </div>
         </fieldset>
      )}
     
     {activeStep === 4 && (
       <fieldset>
       <h1>What experiences are you interested in?</h1>
       <div style={{ display: "inline-flex", gap: "1em" }}>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="culturalSites"
             value="Cultural Sites"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="culturalSites">Cultural Sites</label>
         </div>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="culinary"
             value="Culinary"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="culinary">Culinary</label>
         </div>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="nightlife"
             value="Nightlife"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="nightlife">Nightlife</label>
         </div>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="shopping"
             value="Shopping"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="shopping">Shopping</label>
         </div>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="nature"
             value="Nature"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="nature">Nature</label>
         </div>
         <div>
           <input
             style={{ cursor: "pointer" }}
             type="checkbox"
             id="entertainment"
             value="Entertainment"
             {...register("experiences", { required: true })}
           />
           <label htmlFor="entertainment">Entertainment</label>
         </div>
       </div>
       </fieldset>
     )}
      
      <Button display={activeStep === 0 ? "none" : ""} style={{ cursor: "pointer" }} type="submit" onClick={handleBack}>
        Previous
      </Button>

      <Button display={activeStep === 4 ? "none" : ""} style={{ cursor: "pointer" }} type="submit" onClick={handleNext}>
        Next
      </Button>


      {activeStep === 4 && 
        <Button style={{ cursor: "pointer" }} type="submit">
          Submit
        </Button>
      }
    </form>
  );
};

export default Form;
