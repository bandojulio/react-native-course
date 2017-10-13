import firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift}) => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.firestore().collection(`users/${currentUser.uid}/employees`)
            .add({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        // firebase.firestore().collection(`users/${currentUser.uid}/employees`)
        //     .get()
        //     .then( snapshot => {
        //         let employees = {};
        //         snapshot.forEach(employee => {
        //             employees[employee.id] = employee.data();
        //         });
        //         dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: employees });
        //     });
        
        firebase.firestore().collection(`users/${currentUser.uid}/employees`)
            .onSnapshot( snapshot => {
                let employees = {};
                snapshot.forEach(employee => {
                    employees[employee.id] = employee.data();
                });
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: employees });
            });
            
    };
};