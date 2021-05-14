import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

export default function DateNormal(props: any){
    const [startDate, setStartDate] = useState(new Date());
    const [idStep, setIdStep] = useState(null);

    async function handleSetDate(){
      const response = await fetch('http://localhost:5000/projects/update_data_step', {                
          body: JSON.stringify({
              "id_step_" : idStep,
              "data_previsao_": startDate
          }),
          headers: {
              'Content-Type': 'application/json',
          },
          method: 'POST'
      }).then(async (response)=>{
          if(response == null){
              console.log("vazio");    
          }else{
              const result = await response.json();
          }
      })
    }

    useEffect(()=>{
      setIdStep(props.idStepProp);
    }, []);

    useEffect(()=>{
      handleSetDate();
      console.log(startDate);
      
    }, [startDate]);
    
    return (
      <DatePicker 
        dateFormat="dd/MM/yyyy h:mm aa" 
        selected={startDate} 
        onChange={(date: any) => setStartDate(date)} 
        showTimeSelect
        timeFormat="HH:mm"
        // timeIntervals={15}
        timeCaption="Hora"
      />
    );
}