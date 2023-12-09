import React from "react";
import './Forms/Form.css';
import AppRouter from "./Router/AppRouter";
import SwitchForm from "./Forms/SwitchForm";
import { AuthProvider } from "./Router/AuthProvider";


export default function App() {

    return (      
      <AuthProvider>
        <AppRouter >    

          <SwitchForm />
        </AppRouter> 
      </AuthProvider> 
    );
};

