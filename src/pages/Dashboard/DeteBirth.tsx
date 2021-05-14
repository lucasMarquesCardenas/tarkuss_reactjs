import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

export default function DateBirth(){
    const [startDate, setStartDate] = useState(new Date());
    const [idStep, setIdStep] = useState(null);
    return(
        <DatePicker 
        dateFormat="dd/MM/yyyy h:mm aa" 
        selected={startDate} 
        onChange={(date: any) => setStartDate(date)} 
        showTimeSelect
        timeFormat="HH:mm"
        // timeIntervals={15}
        timeCaption="Hora"
      />
    )
}