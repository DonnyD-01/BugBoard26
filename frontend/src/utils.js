import {AlertCircle, Clock, FileText, Construction, CircleCheckBig, CircleQuestionMark, Lightbulb} from 'lucide-react';
import React from "react";

export const getTypeIcon = (type, size = 16) => {
    switch(type) {
        case "Bug": return <AlertCircle size={size} />;
        case "Feature": return <Lightbulb size={size} />;
        case "Documentation": return <FileText size={size} />;
        case "Question": return <CircleQuestionMark size={size}/>;
        default: return <Clock size={size} />;
    }
};

export const getStatusIcon = (status, size=20) => {
    switch(status) {
        case "To-do": return <Clock size={size}/>;
        case "Assegnata": return <Construction size={size}/>;
        case "Risolta": return <CircleCheckBig size={size}/>
    }
}

export const getStatusColor = (status) => {
    switch(status) {
        case "To-do": return "status-todo";
        case "Assegnata": return "status-assegnata";
        case "Risolta": return "status-risolta";
        default: return "";
    }
};