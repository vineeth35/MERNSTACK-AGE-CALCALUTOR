import React, { useState } from 'react';
 
 function App() {
   const [birthDate, setBirthDate] = useState({
     day: '',
     month: '',
     year: ''
   });
   const [age, setAge] = useState(null);
   const [errors, setErrors] = useState({});
 
   const validateInputs = () => {
     const newErrors = {};
     const currentYear = new Date().getFullYear();
     
     // Validate day
     if (!birthDate.day) {
       newErrors.day = 'Day is required';
     } else if (birthDate.day < 1 || birthDate.day > 31) {
       newErrors.day = 'Must be a valid day';
     }
 
     // Validate month
     if (!birthDate.month) {
       newErrors.month = 'Month is required';
     } else if (birthDate.month < 1 || birthDate.month > 12) {
       newErrors.month = 'Must be a valid month';
     }
 
     // Validate year
     if (!birthDate.year) {
       newErrors.year = 'Year is required';
     } else if (birthDate.year < 1900 || birthDate.year > currentYear) {
       newErrors.year = 'Must be a valid year';
     }
 
     // Check if date is valid
     const date = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
     if (date.getDate() !== parseInt(birthDate.day)) {
       newErrors.day = 'Invalid date';
     }
 
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const calculateAge = () => {
     if (!validateInputs()) return;
 
     const birthDateTime = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
     const currentDate = new Date();
 
     let years = currentDate.getFullYear() - birthDateTime.getFullYear();
     let months = currentDate.getMonth() - birthDateTime.getMonth();
     let days = currentDate.getDate() - birthDateTime.getDate();
 
     if (days < 0) {
       months--;
       // Get days in the previous month
       const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
       days += lastMonth.getDate();
     }
 
     if (months < 0) {
       years--;
       months += 12;
     }
 
     setAge({ years, months, days });
   };
 
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setBirthDate(prev => ({
       ...prev,
       [name]: value
     }));
   };
 
   return (
     <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
       <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
         <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
           Age Calculator
         </h1>
 
         <div className="grid grid-cols-3 gap-4 mb-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Day
             </label>
             <input
               type="number"
               name="day"
               placeholder="DD"
               value={birthDate.day}
               onChange={handleInputChange}
               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                 ${errors.day ? 'border-red-500' : 'border-gray-300'}`}
             />
             {errors.day && (
               <p className="text-red-500 text-xs mt-1">{errors.day}</p>
             )}
           </div>
 
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Month
             </label>
             <input
               type="number"
               name="month"
               placeholder="MM"
               value={birthDate.month}
               onChange={handleInputChange}
               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                 ${errors.month ? 'border-red-500' : 'border-gray-300'}`}
             />
             {errors.month && (
               <p className="text-red-500 text-xs mt-1">{errors.month}</p>
             )}
           </div>
 
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Year
             </label>
             <input
               type="number"
               name="year"
               placeholder="YYYY"
               value={birthDate.year}
               onChange={handleInputChange}
               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                 ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
             />
             {errors.year && (
               <p className="text-red-500 text-xs mt-1">{errors.year}</p>
             )}
           </div>
         </div>
 
         <button
           onClick={calculateAge}
           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
             transition-colors duration-200 mb-6"
         >
           Calculate Age
         </button>
 
         {age && (
           <div className="text-center">
             <h2 className="text-xl font-semibold text-gray-800 mb-4">Your age is:</h2>
             <div className="flex justify-center space-x-4">
               <div className="text-center">
                 <span className="block text-3xl font-bold text-blue-600">{age.years}</span>
                 <span className="text-gray-600">years</span>
               </div>
               <div className="text-center">
                 <span className="block text-3xl font-bold text-blue-600">{age.months}</span>
                 <span className="text-gray-600">months</span>
               </div>
               <div className="text-center">
                 <span className="block text-3xl font-bold text-blue-600">{age.days}</span>
                 <span className="text-gray-600">days</span>
               </div>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 }
 
 export default App;
