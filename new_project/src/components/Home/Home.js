import React, { useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import BCarousel from '../BCarousel/BCarousel';
import About from '../../About/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Information from '../../Information/Information';
import Header from '../../shared/components/Header';
import Admin from '../../Admin/Admin';
import S_SignUp from '../../SignUp/S_SignUp';
import T_SignUp from '../../SignUp/T_SignUp';
import G_SignUp from '../../SignUp/G_SignUp';
import SignIn from '../../SignIn/SignIn';
import Welcome from '../../Welcome/Welcome';
import Institution_list from '../../Institution_List/Institution_List';
import Student from '../../Student/Student';
import Teacher from '../../Teacher/Teacher';
import Guardian from '../../Guardian/Guardian';
import Institution from '../../Institution/Institution';
import Guest_Institution from '../../Guest_Institution/Guest_Institution';
import O_SignIn from '../../SignIn/O_SignIn';
import Institution_SIgnUp from '../../Institution_SignUp/Institution_SignUp';
import Class from '../../Class/Class';
import ClassReg from '../../Class_SignUp/ClassReg';
import SubjectSel from '../../SubjectSel/SubjectSel';
import TimeSel from '../../TimeSel/TimeSel';
import Routine from '../../Routine/Routine';
import Student_Select from '../../Student_Select/Student_Select';
import Dues from '../../Dues/Dues';
import DuesList from '../../DuesList/DuesList';
import Individual from '../../Individual/Individual';
import Routine_S from '../../Routine_S/Routine_S';
import Dues_s from '../../Dues_s/Dues_s';
import DuePayment from '../../DuePayment/DuePayment';
import Welcome2 from '../../Welcome2/Welcome2';
import ClassesInside from '../../ClassesInside/ClassesInside';
import Update_T from '../../Update_class_properties/Update_T';
import Add_S from '../../Update_class_properties/Add_S';
import Remove_S from '../../Update_class_properties/Remove_S';
import RoutineI from '../../Update_class_properties/RoutineI';
import Update_Room from '../../Update_class_properties/Update_Room';
import Class_T_Ins from '../../Class_T_Ins/Class_T_ins';
import Classes_T from '../../Classes_T/Classes_T';
import Result_CT from '../../Result_T/Result_CT';
import Result_HT from '../../Result_T/Result_HT';
import Attendance from '../../Attendance/Attendance';
import Result_S from '../../Result_S/Result_S';
import Result_G from '../../Result_S/Result_G';
import Attendance_S from '../../Attendance_S/Attendance_S';
import Attendance_G from '../../Attendance_S/Attendance_G';

const Home = () => {
    // const [items, setItems] = useState([{ id: 'c1', text: 'Login' }]);

    // const addNewGoalHandler = newGoal => {
    //     setItems(items.concat(newGoal));
    // }

    const [data,setData] = useState([]);
    return (
        <div className='master'>
            <Router>
            <Routes>
                <Route path="/" element={<BCarousel />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/info" element={<Information />}/>
                <Route path="/guest-institution" element={<Guest_Institution />}/>
                <Route path="/s_signup" element={<S_SignUp data={data} setData={setData}/>}/>
                <Route path="/t_signup" element={<T_SignUp data={data} setData={setData}/>}/>
                <Route path="/g_signup" element={<G_SignUp data={data} setData={setData}/>}/>
                <Route path="/signin" element={<SignIn data={data} setData={setData} />}/>
                <Route path="/admin" element={<Admin data={data} setData={setData} />}/>
                <Route path="/welcome" element={<Welcome data={data} setData={setData} />}/>
                <Route path="/institution_list" element={<Institution_list data={data} setData={setData} />}/>
                <Route path="/student" element={<Student data={data} setData={setData} />}/>
                <Route path="/teacher" element={<Teacher data={data} setData={setData} />}/>
                <Route path="/guardian" element={<Guardian data={data} setData={setData} />}/>
                <Route path="/institution" element={<Institution data={data} setData={setData} />}/>
                <Route path="/o_signin" element={<O_SignIn data={data} setData={setData} />}/>
                <Route path="/i_signup" element={<Institution_SIgnUp data={data} setData={setData} />}/>
                <Route path="/class" element={<Class data={data} setData={setData} />}/>
                <Route path="/classreg" element={<ClassReg data={data} setData={setData} />}/>
                <Route path="/subjectsel" element={<SubjectSel data={data} setData={setData} />}/>
                <Route path="/timesel" element={<TimeSel data={data} setData={setData} />}/>
                <Route path="/routine" element={<Routine data={data} setData={setData} />}/>
                <Route path="/student_select" element={<Student_Select data={data} setData={setData} />}/>
                <Route path="/dues" element={<Dues data={data} setData={setData} />}/>
                <Route path="/dueslist" element={<DuesList data={data} setData={setData} />}/>
                <Route path="/individual" element={<Individual data={data} setData={setData} />}/>
                <Route path="/dues_s" element={<Dues_s data={data} setData={setData} />}/>
                <Route path="/routine_s" element={<Routine_S data={data} setData={setData} />}/>
                <Route path="/payment" element={<DuePayment data={data} setData={setData} />}/>
                <Route path="/welcome2" element={<Welcome2 data={data} setData={setData} />}/>
                <Route path="/classesinside" element={<ClassesInside data={data} setData={setData} />}/>
                <Route path="/teacher_update" element={<Update_T data={data} setData={setData} />}/>
                <Route path="/student_add" element={<Add_S data={data} setData={setData} />}/>
                <Route path="/student_remove" element={<Remove_S data={data} setData={setData} />}/>
                <Route path="/room_update" element={<Update_Room data={data} setData={setData} />}/>
                <Route path="/routine_i" element={<RoutineI data={data} setData={setData} />}/>
                <Route path="/class_t_ins" element={<Class_T_Ins data={data} setData={setData} />}/>
                <Route path="/classes_t" element={<Classes_T data={data} setData={setData} />}/>
                <Route path="/result_ct" element={<Result_CT data={data} setData={setData} />}/>
                <Route path="/result_ht" element={<Result_HT data={data} setData={setData} />}/>
                <Route path="/attendance" element={<Attendance data={data} setData={setData} />}/>
                <Route path="/result_s" element={<Result_S data={data} setData={setData} />}/>
                <Route path="/result_g" element={<Result_G data={data} setData={setData} />}/>
                <Route path="/attendance_s" element={<Attendance_S data={data} setData={setData} />}/>
                <Route path="/attendance_g" element={<Attendance_G data={data} setData={setData} />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default Home;

