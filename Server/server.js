const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const oracledb = require('oracledb');
const e = require('express');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "hr";
const userInfo = "hr";

async function createaccount(req,res) {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    let result = await connection.execute(
        `select max(id) maxid from personalinfo`
    );
    let id = result.rows[0].MAXID;
    id = id+1;
     result = await connection.execute(
      `insert into PersonalInfo
      values(unique_id_seq.nextval,:name,:password,:contactNo,:email,:gender,:address,:type,:dateOfBirth)
      `,
      {
        "name":req.body.name,
        "password":req.body.password,
        "contactNo":req.body.contactNo,
        "type":req.body.type,
        "email":req.body.email,
        "gender":req.body.gender,
        "address":req.body.address,
        "dateOfBirth":req.body.dateofbirth
      }
    );
    result = await connection.execute(
        `commit`
    );
    result = await connection.execute(
        `select * from PersonalInfo`
    );
    res.send(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


app.listen(4000,()=>{
    console.log("Successssssssssss");
});

app.post("/createaccount",(req,res)=>{
    console.log(req.body);
    createaccount(req,res);
});

async function login(req,res) {

    let connection;
    console.log("login e data eseche");
  
    try {
      connection = await oracledb.getConnection( {
        user          : userInfo,
        password      : mypw,
        connectString : "localhost/ORCL"
      });
  
    //   let result = await connection.execute(
    //       `select max(id) maxid from users`
    //   );
    //   let id = result.rows[0].MAXID;
    //   id = id+1;
    //    result = await connection.execute(
    //     `insert into users
    //     values(:id,:name,:password)
    //     `,
    //     {
    //       "id":id,
    //       "name":req.body.name,
    //       "password":req.body.password
    //     }
    //   );
    //   result = await connection.execute(
    //       `commit`
    //   );
    
      console.log("paisi mama");
      console.log(req.body.id);
      console.log(req.body.password);
      //let hash = bcrypt.hashSync(req.body.password, saltRounds);
      //console.log(hash);
      result = await connection.execute(
          `select count(*) countid from studentinfo
          where id=:id AND password=:password`,
          {
            "id":req.body.id,
            "password":req.body.password
          }
      );
      console.log(result);
      let cnt = result.rows[0].COUNTID;
      console.log(cnt);

      if(cnt === 1){
         res.send(true);
      }
      else{
         res.send(false);
      }
      //res.json(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  app.post("/login",(req,res)=>{
      console.log(req.body);
      login(req,res);
  });

  async function o_login(req,res) {

    let connection;
    console.log("login e data eseche");
  
    try {
      connection = await oracledb.getConnection( {
        user          : userInfo,
        password      : mypw,
        connectString : "localhost/ORCL"
      });
  
    //   let result = await connection.execute(
    //       `select max(id) maxid from users`
    //   );
    //   let id = result.rows[0].MAXID;
    //   id = id+1;
    //    result = await connection.execute(
    //     `insert into users
    //     values(:id,:name,:password)
    //     `,
    //     {
    //       "id":id,
    //       "name":req.body.name,
    //       "password":req.body.password
    //     }
    //   );
    //   result = await connection.execute(
    //       `commit`
    //   );
    
      console.log("paisi mama");
      console.log(req.body.email);
      console.log(req.body.password);
      const tableName=req.body.type + 'info';
      if (req.body.type === 'Teacher') {
        result = await connection.execute(
          `select * from teacherinfo
          where email=:email AND password=:password`,
          {
            "email": req.body.email,
            "password": req.body.password
          }
        );
      }
      else if (req.body.type === 'Institution') {
        result = await connection.execute(
          `select * from institutioninfo
          where email=:email AND password=:password`,
          {
            "email": req.body.email,
            "password": req.body.password

          }
        );
      }
      else if (req.body.type === 'Guardian') {
        result = await connection.execute(
          `select * from guardianinfo
          where email=:email AND password=:password`,
          {
            "email": req.body.email,
            "password": req.body.password

          }
        );
      }
      else if (req.body.type === 'Admin') {
        result = await connection.execute(
          `select * from admininfo
          where email=:email AND password=:password`,
          {
            "email": req.body.email,
            "password": req.body.password

          }
        );
      }
      console.log(result);

      const cnt = result.rows.length;
      console.log(cnt);
      let obj={
        id: -1,
        firstTime: 'No'
      }
      if(cnt === 1){
        obj.id=result.rows[0].ID;
        console.log("id is: " + obj.id);
        const num = obj.id;

        console.log(num);
        const firstDigitStr = String(num)[0];
        console.log(firstDigitStr);

        const firstDigitNum = Number(firstDigitStr);
        if(firstDigitNum === 3){
          obj.firstTime = result.rows[0].FIRSTTIME;
          // if(obj.firstTime === 'Yes'){
          //   result = await connection.execute(
          //     `update institutioninfo
          //     set firsttime='No'
          //     where id=:id`,
          //     {
          //       "id": obj.id    
          //     }
          //   );
          //   result = await connection.execute(
          //     `commit`
          //   );
          // }
        }
      }
      res.send(obj);
      //res.json(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  app.post("/o_login",(req,res)=>{
      console.log(req.body);
      o_login(req,res);
  });

  async function adminLogInInfo(req,res) {

    let connection;
    console.log("login e data eseche");
  
    try {
      connection = await oracledb.getConnection( {
        user          : userInfo,
        password      : mypw,
        connectString : "localhost/ORCL"
      });
  
    //   let result = await connection.execute(
    //       `select max(id) maxid from users`
    //   );
    //   let id = result.rows[0].MAXID;
    //   id = id+1;
    //    result = await connection.execute(
    //     `insert into users
    //     values(:id,:name,:password)
    //     `,
    //     {
    //       "id":id,
    //       "name":req.body.name,
    //       "password":req.body.password
    //     }
    //   );
    //   result = await connection.execute(
    //       `commit`
    //   );
    
      //console.log("paisi mama");
      console.log(req.body.id);
      //console.log(req.body.password);
      result = await connection.execute(
          `select * from admininfo
          where id=:id`,
          {
            "id":req.body.id
          }
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  app.post("/adminLogInInfo",(req,res)=>{
      console.log(req.body);
      adminLogInInfo(req,res);
  });

  async function getInstitutionInfo(req,res) {

    let connection;
    console.log("login e data eseche");
  
    try {
      connection = await oracledb.getConnection( {
        user          : userInfo,
        password      : mypw,
        connectString : "localhost/ORCL"
      });
  
    //   let result = await connection.execute(
    //       `select max(id) maxid from users`
    //   );
    //   let id = result.rows[0].MAXID;
    //   id = id+1;
    //    result = await connection.execute(
    //     `insert into users
    //     values(:id,:name,:password)
    //     `,
    //     {
    //       "id":id,
    //       "name":req.body.name,
    //       "password":req.body.password
    //     }
    //   );
    //   result = await connection.execute(
    //       `commit`
    //   );
    
      //console.log("paisi mama");
      //console.log(req.body.id);
      //console.log(req.body.password);
      result = await connection.execute(
          `select * from institutioninfo`,
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  app.post("/getInstitutionInfo",(req,res)=>{
      console.log(req.body);
      getInstitutionInfo(req,res);
  });

  async function getClassesInfo(req,res) {

    let connection;
    console.log("login e data eseche");
  
    try {
      connection = await oracledb.getConnection( {
        user          : userInfo,
        password      : mypw,
        connectString : "localhost/ORCL"
      });
  
    //   let result = await connection.execute(
    //       `select max(id) maxid from users`
    //   );
    //   let id = result.rows[0].MAXID;
    //   id = id+1;
    //    result = await connection.execute(
    //     `insert into users
    //     values(:id,:name,:password)
    //     `,
    //     {
    //       "id":id,
    //       "name":req.body.name,
    //       "password":req.body.password
    //     }
    //   );
    //   result = await connection.execute(
    //       `commit`
    //   );
    
      //console.log("paisi mama");
      //console.log(req.body.id);
      //console.log(req.body.password);
      result = await connection.execute(
          `select c.id,c.room_no,c.section,c.standard,c.division
          from classinfo c join classinstitutionrelation cir
          on c.id=cir.classid
          where cir.institutionid=:id`,
          {
            "id":req.body.id
          }
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  app.post("/getclassesInfo",(req,res)=>{
      console.log(req.body);
      getClassesInfo(req,res);
  });
//console.log("hello");

async function StudentSignUp(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

     result = await connection.execute(
      `select count(*) countid from institutioninfo
      where id=:institution_id
      `,
      {
        "institution_id":req.body.institution_id
      }
    );
    let cnt = result.rows[0].COUNTID;
    let obj = {
      id: -1,
      isDone: false
    }
    if (cnt === 1) {
      obj.isDone = true;
      //let hash = bcrypt.hashSync(req.body.password, saltRounds);
      //console.log('hash value is: ');
      //console.log(hash);
      result = await connection.execute(
        `insert into studentinfo
            values(student_info_seq.nextval,:name,:contact,:email,:gender,:address,to_date(:dateofbirth,'dd/mon/yyyy'),:password)
            `,
        {
          "name": req.body.name,
          "contact": req.body.contact,
          "email": req.body.email,
          "gender": req.body.gender,
          "address": req.body.address,
          "dateofbirth": req.body.dateofbirth,
          "password": req.body.password
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `insert into studentinstitutionrelation
            values(student_info_seq.currval,:institution_id,'Yes')
            `,
        {
          "institution_id":req.body.institution_id
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `select max(id) maxid from studentinfo`
      );
      obj.id=result.rows[0].MAXID;
    }
  
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(obj);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/StudentSignUp",(req,res)=>{
    console.log(req.body);
    StudentSignUp(req,res);
});

async function TeacherSignUp(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

     result = await connection.execute(
      `select count(*) countid from institutioninfo
      where id=:institution_id
      `,
      {
        "institution_id":req.body.institution_id
      }
    );
    console.log('Maf kor vai');
    let cnt = result.rows[0].COUNTID;
    let obj = {
      id: -1,
      isDone: false
    }
    if (cnt === 1) {
      obj.isDone = true;
      result = await connection.execute(
        `insert into teacherinfo
            values(teacher_info_seq.nextval,:name,:contact,:email,:gender,:address,to_date(:dateofbirth,'dd/mon/yyyy'),:password)
            `,
        {
          "name": req.body.name,
          "contact": req.body.contact,
          "email": req.body.email,
          "gender": req.body.gender,
          "address": req.body.address,
          "dateofbirth": req.body.dateofbirth,
          "password":req.body.password
        }
      );
      result = await connection.execute(
        `commit`
      );
      console.log("Insert korsi");
      result = await connection.execute(
        `insert into teacherinstitutionrelation(teacherid,institutionid)
            values(teacher_info_seq.currval,:institution_id)
            `,
        {
          "institution_id":req.body.institution_id
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `select max(id) maxid from teacherinfo`
      );
      obj.id=result.rows[0].MAXID;
    }
  
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(obj);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/TeacherSignUp",(req,res)=>{
    console.log(req.body);
    TeacherSignUp(req,res);
});

async function ClassSignUp(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection({
      user: userInfo,
      password: mypw,
      connectString: "localhost/ORCL"
    });

    result = await connection.execute(
      `select count(*) countid 
      from classinfo c join classinstitutionrelation cir on c.id=cir.classid
      where (c.room_no=:roomno and cir.institutionid=:institution_id) or (c.section=:section and c.standard=:standard and cir.institutionid=:institution_id)
      `,
      {
        "roomno": req.body.roomno,
        "institution_id": req.body.institution_id,
        "section": req.body.section,
        "standard": req.body.standard
      }
    );

    let obj={
      id: -1,
      done: false
    }
    if (result.rows[0].COUNTID === 0) {
      obj.done = true;

      result = await connection.execute(
        `insert into classinfo
            values(class_info_seq.nextval,:roomno,:section,:standard,:division)
            `,
        {
          "roomno": req.body.roomno,
          "section": req.body.section,
          "standard": req.body.standard,
          "division": req.body.division
        }
      );
      result = await connection.execute(
        `commit`
      );
      console.log("Insert korsi");
      result = await connection.execute(
        `insert into classinstitutionrelation
            values(class_info_seq.currval,:institution_id)
            `,
        {
          "institution_id": req.body.institution_id
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `select max(id) maxid from classinfo`
      );
      obj.id = result.rows[0].MAXID;
    }
  
    
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(obj);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/ClassSignUp",(req,res)=>{
    console.log(req.body);
    ClassSignUp(req,res);
});

async function InstitutionSignUp(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    let obj = {
      id: -1,
      isDone: true
    }

    //obj.isDone = true;
    result = await connection.execute(
      `insert into institutioninfo
            values(institution_info_seq.nextval,:name,:itype,:email,:websitelink,:district,:thana,:postoffice,:password,'Yes')
            `,
      {
        "name": req.body.name,
        "itype": req.body.itype,
        "email": req.body.email,
        "websitelink": req.body.websitelink,
        "district": req.body.district,
        "thana": req.body.thana,
        "postoffice": req.body.postoffice,
        "password": req.body.password
      }
    );
    result = await connection.execute(
      `commit`
    );
    console.log("Insert korsi");
    result = await connection.execute(
      `select max(id) maxid from teacherinfo`
    );
    obj.id = result.rows[0].MAXID;
  
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(obj);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/InstitutionSignUp",(req,res)=>{
    console.log(req.body);
    InstitutionSignUp(req,res);
});

async function GuardianSignUp(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

     result = await connection.execute(
      `select count(*) countid from studentinfo
      where id=:student_id
      `,
      {
        "student_id":req.body.student_id
      }
    );
    let cnt = result.rows[0].COUNTID;
    let obj = {
      id: -1,
      isDone: false
    }
    if (cnt === 1) {
      obj.isDone = true;
      result = await connection.execute(
        `insert into guardianinfo
            values(guardian_info_seq.nextval,:name,:email,:profession,:gender,:address,:contact,to_date(:dateofbirth,'dd/mon/yyyy'),:password)
            `,
        {
          "name": req.body.name,
          "contact": req.body.contact,
          "email": req.body.email,
          "gender": req.body.gender,
          "address": req.body.address,
          "dateofbirth": req.body.dateofbirth,
          "profession": req.body.profession,
          "password": req.body.password
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `insert into studentguardianrelation
            values(:student_id,guardian_info_seq.currval,:relation)
            `,
        {
          "student_id":req.body.student_id,
          "relation": req.body.relation
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `select max(id) maxid from guardianinfo`
      );
      obj.id=result.rows[0].MAXID;
    }
  
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(obj);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/GuardianSignUp",(req,res)=>{
    console.log(req.body);
   GuardianSignUp(req,res);
});

async function studentLogInInfo(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log(req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from studentinfo
        where id=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/studentLogInInfo",(req,res)=>{
    console.log(req.body);
    studentLogInInfo(req,res);
});

async function teacherLogInInfo(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log(req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from teacherinfo
        where id=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/teacherLogInInfo",(req,res)=>{
    console.log(req.body);
    teacherLogInInfo(req,res);
});

async function guardianLogInInfo(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log(req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from guardianinfo
        where id=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/guardianLogInInfo",(req,res)=>{
    console.log(req.body);
    guardianLogInInfo(req,res);
});

async function institutionLogInInfo(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log(req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from institutioninfo
        where id=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/institutionLogInInfo",(req,res)=>{
    console.log(req.body);
    institutionLogInInfo(req,res);
});

async function GetInstitutionFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Class id is: ' + req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from classinstitutionrelation
        where classid=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getinstitutionfromclass",(req,res)=>{
    console.log(req.body);
    GetInstitutionFromClass(req,res);
});

async function GetTeacherFromInstitution(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Institution id is: ' + req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select ti.id,ti.name
        from teacherinfo ti join teacherinstitutionrelation tir
        on tir.teacherid=ti.id
        where tir.institutionid=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getteacherfrominstitution",(req,res)=>{
    console.log('Ekho req print korbo');
    console.log(req.body);
    GetTeacherFromInstitution(req,res);
});

async function GetTeacherFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Class id is: ' + req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select ti.id,ti.name
        from classinstitutionrelation cir join teacherinstitutionrelation tir on cir.institutionid=tir.institutionid
        join teacherinfo ti on ti.id=tir.teacherid
        where cir.classid=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getteacherfromclass",(req,res)=>{
    console.log(req.body);
    GetTeacherFromClass(req,res);
});

async function GetSubjectFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Class id is: ' + req.body.id);
    //console.log(req.body.password);
    result = await connection.execute(
        `select * from classinfo
         where id=:id`,
        {
          "id":req.body.id
        }
    );
    console.log(result);
    let category='Primary';
    const division=result.rows[0].DIVISION;
    if(result.rows[0].STANDARD >= 6 && result.rows[0].STANDARD <= 8){
      category='Junior';
    }
    else if(result.rows[0].STANDARD >= 9 && result.rows[0].STANDARD <= 10){
      category='Secondary';
    }
    else if(result.rows[0].STANDARD >= 11 && result.rows[0].STANDARD <= 12){
      category='Higher Secondary';
    }
    console.log('Category is: ' + category);
    console.log('Division is: ' + division);
    result = await connection.execute(
      `select name from subjectinfo
      where category=:category AND (division=:division OR division='All')`,
      {
        "category": category,
        "division": division
      }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getsubjectfromclass",(req,res)=>{
    console.log(req.body);
    GetSubjectFromClass(req,res);
});

async function SelectWorkingHours(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Institution id is: ' + req.body.institutionid);
    for(let i=0;i<req.body.workingdays.length;i++){
      result = await connection.execute(
        `insert into workingdays
              values(:institutionid,:day)
              `,
        {
          "institutionid": req.body.institutionid,
          "day": req.body.workingdays[i]
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
    for(let i=0;i<req.body.periods.length;i++){
      result = await connection.execute(
        `insert into workinghours
              values(:institutionid,:periodno,:starttime,:endtime)
              `,
        {
          "institutionid": req.body.institutionid,
          "periodno": req.body.periods[i].num,
          "starttime": req.body.periods[i].start,
          "endtime": req.body.periods[i].end
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
    result = await connection.execute(
      `update institutioninfo
          set firsttime='No'
          where id=:id`,
      {
        "id": req.body.institutionid
      }
    );
    result = await connection.execute(
      `commit`
    );
    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/selectworkinghours",(req,res)=>{
    console.log(req.body);
    SelectWorkingHours(req,res);
});

async function SubjectTeacherRelation(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('Institution id is: ' + req.body.classid);
    for(let i=0;i<req.body.chosensubj.length;i++){
      result = await connection.execute(
        `insert into classsubjectteacherrelation
              values(:classid,:subjectname,:teacherid)
              `,
        {
          "classid": req.body.classid,
          "subjectname": req.body.chosensubj[i].name,
          "teacherid": req.body.chosensubj[i].id
        }
      );
      result = await connection.execute(
        `commit`
      );
    }

    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/subjectteacherrelation",(req,res)=>{
    console.log(req.body);
    SubjectTeacherRelation(req,res);
});

async function GetDaysFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('class id is: ' + req.body.id);

    result = await connection.execute(
      `select wd.day
        from classinstitutionrelation cir join workingdays wd on cir.institutionid=wd.institutionid
        where cir.classid=:id
              `,
      {
        "id": req.body.id
      }
    );

    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getdaysfromclass",(req,res)=>{
    console.log(req.body);
    GetDaysFromClass(req,res);
});

async function GetPeriodsFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('class id is: ' + req.body.id);

    result = await connection.execute(
      `select wh.periodno
      from classinstitutionrelation cir join workinghours wh on cir.institutionid=wh.institutionid
      where cir.classid=:id
              `,
      {
        "id": req.body.id
      }
    );

    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getperiodsfromclass",(req,res)=>{
    console.log(req.body);
    GetPeriodsFromClass(req,res);
});

async function GetSubjectsFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('class id is: ' + req.body.id);

    result = await connection.execute(
      `select subjectname,teacherid
      from classsubjectteacherrelation
      where classid=:id
              `,
      {
        "id": req.body.id
      }
    );

    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getsubjectsfromclass",(req,res)=>{
    console.log(req.body);
    GetSubjectsFromClass(req,res);
});

async function GetAvailableStudentsFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('class id is: ' + req.body.id);

    result = await connection.execute(
      `select si.id,si.name
      from classinstitutionrelation cir join studentinstitutionrelation sir on cir.institutionid=sir.institutionid 
      join studentinfo si on sir.studentid=si.id
      where cir.classid=:id
      minus
      (
      select si.id,si.name
      from classinstitutionrelation cir join studentinstitutionrelation sir on cir.institutionid=sir.institutionid  
      join studentclassrelation scr on sir.studentid=scr.studentid
      join studentinfo si on scr.studentid=si.id
      where cir.classid=:id
      )
              `,
      {
        "id": req.body.id
      }
    );

    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getavailablestudentsfromclass",(req,res)=>{
    console.log(req.body);
    GetAvailableStudentsFromClass(req,res);
});

async function AddStudentsToClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('class id is: ' + req.body.classid);

    for (let i = 0; i < req.body.student.length; i++) {
      result = await connection.execute(
        `insert into studentclassrelation values(:studentid,:classid,:rollno)
              `,
        {
          "classid": req.body.classid,
          "studentid": req.body.student[i].id,
          "rollno": req.body.student[i].roll
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `insert into result(classid,subjectname,teacherid,studentid)
         select cstr.classid,cstr.subjectname,cstr.teacherid,scr.studentid
         from classsubjectteacherrelation cstr join studentclassrelation scr on cstr.classid=scr.classid
         where cstr.classid=:classid and scr.studentid=:studentid
              `,
        {
          "classid": req.body.classid,
          "studentid": req.body.student[i].id
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
    result = await connection.execute(
      `update result
      set ctmarks=0
      where ctmarks is null
            `
    );
    result = await connection.execute(
      `commit`
    );
    result = await connection.execute(
      `update result
      set htmarks=0
      where htmarks is null
            `
    );
    result = await connection.execute(
      `commit`
    );


    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/addstudentstoclass",(req,res)=>{
    console.log(req.body);
    AddStudentsToClass(req,res);
});

async function AssignDuesToClasses(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('institution id is: ' + req.body.institutionid);


    const studentid=[];
    for (let i = 0; i < req.body.classid.length; i++) {
      result = await connection.execute(
        `select studentid from studentclassrelation
         where classid=:classid 
              `,
        {
          "classid": req.body.classid[i]
        }
      );
      for(let j = 0; j < result.rows.length; j++){
        studentid.push(result.rows[j].STUDENTID);
      }
    }

    console.log(studentid);
    for (let i = 0; i < studentid.length; i++) {
      result = await connection.execute(
        `insert into dues values(due_id_seq.nextval,:studentid,:institutionid,'No',getotp(due_id_seq.currval),:dtype,:description,:amount)
              `,
        {
          "studentid": studentid[i],
          "institutionid": req.body.institutionid,
          "dtype": req.body.type,
          "description": req.body.description,
          "amount": req.body.amount
        }
      );
      result = await connection.execute(
        `commit`
      );
    }

    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/assignduestoclasses",(req,res)=>{
    console.log(req.body);
    AssignDuesToClasses(req,res);
});

async function GetUnpaidDues(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('institution id is: ' + req.body.id);

    result = await connection.execute(
      `select studentid,duetype,description,amount
       from dues
         where institutionid=:institutionid and paid='No' 
              `,
      {
        "institutionid": req.body.id
      }
    );

    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getunpaiddues",(req,res)=>{
    console.log(req.body);
    GetUnpaidDues(req,res);
});

async function AddDuesToIndividual(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

     result = await connection.execute(
      `select count(*) countid from studentinstitutionrelation
      where studentid=:studentid
      `,
      {
        "studentid":req.body.studentid
      }
    );
    let cnt = result.rows[0].COUNTID;
    let isDone=false;
    if (cnt === 1) {
      isDone = true;
      result = await connection.execute(
        `insert into dues
            values(due_id_seq.nextval,:studentid,:institutionid,'No',getotp(due_id_seq.currval),:duetype,:description,:amount)
            `,
        {
          "studentid": req.body.studentid,
          "institutionid": req.body.institutionid,
          "duetype": req.body.duetype,
          "description": req.body.description,
          "amount": req.body.amount
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
  
    //console.log("paisi mama");
    //console.log(req.body.id);
    //console.log(req.body.password);

    console.log(isDone);
    res.send(isDone);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/addduestoindividual",(req,res)=>{
    console.log(req.body);
    AddDuesToIndividual(req,res);
});

async function GetDuesFromGuardian(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

  //   let result = await connection.execute(
  //       `select max(id) maxid from users`
  //   );
  //   let id = result.rows[0].MAXID;
  //   id = id+1;
  //    result = await connection.execute(
  //     `insert into users
  //     values(:id,:name,:password)
  //     `,
  //     {
  //       "id":id,
  //       "name":req.body.name,
  //       "password":req.body.password
  //     }
  //   );
  //   result = await connection.execute(
  //       `commit`
  //   );
  
    //console.log("paisi mama");
    console.log('guardian id is: ' + req.body.guardianid);

    result = await connection.execute(
      `select studentid
       from studentguardianrelation
         where guardianid=:guardianid 
              `,
      {
        "guardianid": req.body.guardianid
      }
    );
    const stdid=result.rows[0].STUDENTID;
    result = await connection.execute(
      `select id,duetype,description,amount
       from dues
         where studentid=:studentid and paid='No'
              `,
      {
        "studentid": stdid
      }
    );

    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getduesfromguardian",(req,res)=>{
  console.log(req.body);
  GetDuesFromGuardian(req,res);
});

async function GetDuesFromStudent(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('student id is: ' + req.body.studentid);

    result = await connection.execute(
      `select id,duetype,description,amount
       from dues
         where studentid=:studentid and paid='No'
              `,
      {
        "studentid": req.body.studentid
      }
    );

    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getduesfromstudent",(req,res)=>{
  console.log(req.body);
  GetDuesFromStudent(req,res);
});

async function VerifyOTP(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Due id is: ' + req.body.dueid);

    result = await connection.execute(
      `select otp
       from dues
         where id=:id 
              `,
      {
        "id": req.body.dueid
      }
    );

    console.log(result);
    // res.send(result);
    if(result.rows[0].OTP == req.body.otp){
      result = await connection.execute(
        `update dues
         set paid='Yes'
           where id=:id 
                `,
        {
          "id": req.body.dueid
        }
      );
      result = await connection.execute(
        `commit`
      );
      res.send(true);
    }
    else{
      res.send(false);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/verifyotp",(req,res)=>{
  console.log(req.body);
  VerifyOTP(req,res);
});

async function TeacherForRoutineValidation(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Due id is: ' + req.body.dueid);

    result = await connection.execute(
      `select otp
       from dues
         where id=:id 
              `,
      {
        "id": req.body.dueid
      }
    );

    console.log(result);
    // res.send(result);
    if(result.rows[0].OTP == req.body.otp){
      result = await connection.execute(
        `update dues
         set paid='Yes'
           where id=:id 
                `,
        {
          "id": req.body.dueid
        }
      );
      result = await connection.execute(
        `commit`
      );
      res.send(true);
    }
    else{
      res.send(false);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/teacherforroutinevalidation",(req,res)=>{
  console.log(req.body);
  TeacherForRoutineValidation(req,res);
});

async function InsertRoutine(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);
    console.log('Routine paisi');
    console.log(req.body);

    result = await connection.execute(
      `select subjectname, teacherid
      from classsubjectteacherrelation
      where classid = :id 
              `,
      {
        "id": req.body.classid
      }
    );

    const subTeacher=[];
    for(let i=0;i<result.rows.length;i++){
       const new1={
        subject: result.rows[i].SUBJECTNAME,
        teacherid: result.rows[i].TEACHERID
       }
       subTeacher.push(new1);
    }
    // const dlen=req.body.Day.length;
    // const tlen=req.body.times.length;

    console.log(result);
    // res.send(result);
    for(let i=0;i<req.body.Table.length; i++){
      let tid=null;
      if(req.body.Table[i].value !== ""){
        for(let j = 0; j < subTeacher.length; j++){
           if(req.body.Table[i].value === subTeacher[j].subject){
              tid=subTeacher[j].teacherid;
              break;
           }
        }
      }
      console.log('Teacher id: ' + tid + ' for subject: ' + req.body.Table[i].value);
      result = await connection.execute(
        `insert into routine values(:classid,:teacherid,:subject,:periodno,:day) 
                `,
        {
          "classid": req.body.classid,
          "teacherid": tid,
          "subject": req.body.Table[i].value,
          "periodno": req.body.Table[i].period,
          "day": req.body.Table[i].day 
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
    result = await connection.execute(
      `select institutionid from classinstitutionrelation
      where classid=:classid 
              `,
      {
        "classid": req.body.classid
      }
    );
    const obj={
      institutionid: result.rows[0].INSTITUTIONID,
      done: true
    }
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/insertroutine",(req,res)=>{
  console.log(req.body);
  InsertRoutine(req,res);
});

async function GetRoutineFromStudent(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Student id is: ' + req.body.id);

    result = await connection.execute(
      `select classid
      from studentclassrelation
      where studentid = :id
              `,
      {
        "id": req.body.id
      }
    );

    const classid = result.rows[0].CLASSID;
    result = await connection.execute(
      `select subject,periodno,day 
        from routine
        where classid=:classid 
                `,
      {
        "classid": classid
      }
    );
    
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getroutinefromstudent",(req,res)=>{
  console.log(req.body);
  GetRoutineFromStudent(req,res);
});

async function RoutineValidation(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);
    const subject=req.body.table[0].subject;

    result = await connection.execute(
      `select teacherid
      from classsubjectteacherrelation
      where classid = :classid and subjectname=:subject
              `,
      {
        "classid": req.body.classid,
        "subject": subject
      }
    );

    const teacherid = result.rows[0].TEACHERID;
    result = await connection.execute(
      `select periodno,day 
        from routine
        where teacherid=:teacherid 
                `,
      {
        "teacherid": teacherid
      }
    );
    let dayTimeValid={
      day: "",
      time: "",
      isValid: true
    }

    for(let i = 0; i < req.body.table.length; i++){
      for(let j = 0; j < result.rows.length; j++){
        if(req.body.table[i].day === result.rows[j].DAY && req.body.table[i].period === result.rows[j].PERIODNO){
          dayTimeValid.isValid=false;
          dayTimeValid.day=req.body.table[i].day;
          dayTimeValid.time=req.body.table[i].period;
          break;
        }
      }
      if(!dayTimeValid.isValid){
        break;
      }
    }
    console.log(dayTimeValid);
    res.send(dayTimeValid);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/routinevalidation",(req,res)=>{
  console.log(req.body);
  RoutineValidation(req,res);
});

async function GetInfoFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);

    result = await connection.execute(
      `select standard,section 
        from classinfo
        where id=:classid 
                `,
      {
        "classid": req.body.classid
      }
    );
    
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getinfofromclass",(req,res)=>{
  console.log(req.body);
  GetInfoFromClass(req,res);
});

async function GetStudentFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);

    result = await connection.execute(
      `select scr.rollno, si.name
      from studentclassrelation scr join studentinfo si on scr.studentid=si.id
      where classid=:classid
      order by scr.rollno
                `,
      {
        "classid": req.body.classid
      }
    );
    
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getstudentfromclass",(req,res)=>{
  console.log(req.body);
  GetStudentFromClass(req,res);
});

async function GetInstitutionFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);

    result = await connection.execute(
      `select institutionid from classinstitutionrelation
      where classid=:classid 
              `,
      {
        "classid": req.body.classid
      }
    );
    
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getinstitutionfromclass",(req,res)=>{
  console.log(req.body);
  GetInstitutionFromClass(req,res);
});

async function GetRoutineFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.id);

    result = await connection.execute(
      `select subject,periodno,day 
        from routine
        where classid=:classid 
                `,
      {
        "classid": req.body.id
      }
    );
    
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getroutinefromclass",(req,res)=>{
  console.log(req.body);
  GetRoutineFromClass(req,res);
});

async function UpdateRoomNoVerify(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });
    console.log('Class id is: ' + req.body.classid);

    result = await connection.execute(
      `select institutionid 
        from classinstitutionrelation
        where classid=:classid 
                `,
      {
        "classid": req.body.classid
      }
    );
    
    const insId=result.rows[0].INSTITUTIONID;
    result = await connection.execute(
      `select count(*) countid
      from classinstitutionrelation cir join classinfo ci on cir.classid=ci.id
      where cir.institutionid=:insId and ci.room_no=:roomno 
                `,
      {
        "insId": insId,
        "roomno": req.body.roomno
      }
    );
    console.log(result);
    if(result.rows[0].COUNTID == 0){
      result = await connection.execute(
        `update classinfo
        set room_no=:roomno
        where id=:classid 
                  `,
        {
          "classid": req.body.classid,
          "roomno": req.body.roomno
        }
      );
      result = await connection.execute(
        `commit`
      );
      res.send(true);
    }
    else{
      res.send(false);
    }
    // res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/updateroomnoverify",(req,res)=>{
  console.log(req.body);
  UpdateRoomNoVerify(req,res);
});

async function VerifyNewAddedStudents(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('class id is: ' + req.body.classid);

    result = await connection.execute(
        `select rollno
        from studentclassrelation
        where classid=:classid`,
        {
          "classid": req.body.classid
        }
    );

    console.log(result);
    console.log(req.body.student);
    let k=-1;
    for(let i=0;i<req.body.student.length;i++){
      for(let j=0;j<result.rows.length;j++){
        const str=result.rows[j].ROLLNO.toString();
         if(str === req.body.student[i].roll){
           k=result.rows[j].ROLLNO;
           break;
         }
      }
      if(k !== -1){
        break;
      }
    }
    let obj = {
      roll: k,
      done: false
    }

    if (k === -1) {
      obj.done=true;
      for (let i = 0; i < req.body.student.length; i++) {
        result = await connection.execute(
          `insert into studentclassrelation values(:studentid,:classid,:rollno)
              `,
          {
            "classid": req.body.classid,
            "studentid": req.body.student[i].id,
            "rollno": req.body.student[i].roll
          }
        );
        result = await connection.execute(
          `commit`
        );
        result = await connection.execute(
          `insert into result(classid,subjectname,teacherid,studentid)
           select cstr.classid,cstr.subjectname,cstr.teacherid,scr.studentid
           from classsubjectteacherrelation cstr join studentclassrelation scr on cstr.classid=scr.classid
           where cstr.classid=:classid and scr.studentid=:studentid
                `,
          {
            "classid": req.body.classid,
            "studentid": req.body.student[i].id
          }
        );
        result = await connection.execute(
          `commit`
        );
      }
      result = await connection.execute(
        `update result
        set ctmarks=0
        where ctmarks is null
              `
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `update result
        set htmarks=0
        where htmarks is null
              `
      );
      result = await connection.execute(
        `commit`
      );
    }

    console.log(obj);
    //console.log(req.body.password);
    res.send(obj);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/verifynewaddedstudents",(req,res)=>{
    console.log(req.body);
    VerifyNewAddedStudents(req,res);
});

async function GetStudentsFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('class id is: ' + req.body.id);

    result = await connection.execute(
        `select si.id,si.name
        from studentclassrelation scr join studentinfo si on scr.studentid=si.id
        where scr.classid=:classid`,
        {
          "classid": req.body.id
        }
    );

    console.log(result);
    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getstudentsfromclass",(req,res)=>{
    console.log(req.body);
    GetStudentsFromClass(req,res);
});

async function RemoveStudentsFromClass(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('class id is: ' + req.body.classid);

    for (let i = 0; i < req.body.student.length; i++) {
      result = await connection.execute(
        `delete from studentclassrelation
        where studentid=:studentid
              `,
        {
          "studentid": req.body.student[i].id
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `delete from result
        where studentid=:studentid
              `,
        {
          "studentid": req.body.student[i].id
        }
      );
      result = await connection.execute(
        `commit`
      );
      result = await connection.execute(
        `delete from attendance
        where studentid=:studentid
              `,
        {
          "studentid": req.body.student[i].id
        }
      );
      result = await connection.execute(
        `commit`
      );
    }
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/removestudentsfromclass",(req,res)=>{
    console.log(req.body);
    RemoveStudentsFromClass(req,res);
});

async function GetClassFromTeacher(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Teacher id is: ' + req.body.teacherid);

    result = await connection.execute(
      `select ci.id,ci.standard,ci.division,ci.section,ci.room_no,cstr.subjectname
      from classsubjectteacherrelation cstr join classinfo ci on cstr.classid=ci.id
      where cstr.teacherid=:teacherid`,
      {
        "teacherid": req.body.teacherid
      }
  );

  console.log(result);
  res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getclassfromteacher",(req,res)=>{
    console.log(req.body);
    GetClassFromTeacher(req,res);
});

async function GetRoutineFromClassSubject(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Class id is: ' + req.body.classid);

    result = await connection.execute(
      `select periodno,day
      from routine
      where classid=:classid and subject=:subject`,
      {
        "classid": req.body.classid,
        "subject": req.body.subject
      }
  );

  console.log(result);
  res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getroutinefromclasssubject",(req,res)=>{
    console.log(req.body);
    GetRoutineFromClassSubject(req,res);
});

async function GetStudentsForMarks(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('class id is: ' + req.body.classid);

    result = await connection.execute(
        `select si.id,si.name,scr.rollno
        from studentclassrelation scr join studentinfo si on scr.studentid=si.id
        where scr.classid=:classid
        order by scr.rollno`,
        {
          "classid": req.body.classid
        }
    );

    console.log(result);
    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getstudentsformarks",(req,res)=>{
  console.log(req.body);
  GetStudentsForMarks(req,res);
});

async function UpdateCtMarks(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Class id is: ' + req.body.classid);

    for (let i = 0; i < req.body.student.length; i++) {
      result = await connection.execute(
        `update result
        set ctmarks=:ctmarks
        where studentid=:studentid and classid=:classid and subjectname=:subject
              `,
        {
          "studentid": req.body.student[i].id,
          "ctmarks": req.body.student[i].marks,
          "classid": req.body.classid,
          "subject": req.body.subject
        }
      );
      result = await connection.execute(
        `commit`
      );
    }

    //console.log(result);
    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/updatectmarks",(req,res)=>{
  console.log(req.body);
  UpdateCtMarks(req,res);
});

async function UpdateHtMarks(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Class id is: ' + req.body.classid);

    for (let i = 0; i < req.body.student.length; i++) {
      result = await connection.execute(
        `update result
        set htmarks=:htmarks
        where studentid=:studentid and classid=:classid and subjectname=:subject
              `,
        {
          "studentid": req.body.student[i].id,
          "htmarks": req.body.student[i].marks,
          "classid": req.body.classid,
          "subject": req.body.subject
        }
      );
      result = await connection.execute(
        `commit`
      );
    }

    //console.log(result);
    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/updatehtmarks",(req,res)=>{
  console.log(req.body);
  UpdateHtMarks(req,res);
});

async function UpdateAttendance(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Class id is: ' + req.body.classid);

    for (let i = 0; i < req.body.student.length; i++) {
      result = await connection.execute(
        `insert into attendance values(:studentid,:classid,to_date(:cdate,'yyyy-mm-dd'),:subject,:present)
              `,
        {
          "studentid": req.body.student[i].id,
          "cdate": req.body.student[i].date,
          "present": req.body.student[i].present,
          "classid": req.body.classid,
          "subject": req.body.subject
        }
      );
      result = await connection.execute(
        `commit`
      );
    }

    //console.log(result);
    //console.log(req.body.password);
    res.send(true);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/updateattendance",(req,res)=>{
  console.log(req.body);
  UpdateAttendance(req,res);
});

async function GetResultFromStudent(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Student id is: ' + req.body.id);

    result = await connection.execute(
        `select subjectname,ctmarks,htmarks,getadd3(ctmarks,htmarks) total,getg(ctmarks,htmarks) grade
        from result
        where studentid=:id`,
        {
          "id": req.body.id
        }
    );

    console.log(result);
    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getresultfromstudent",(req,res)=>{
  console.log(req.body);
  GetResultFromStudent(req,res);
});

async function GetResultFromGuardian(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Guardian id is: ' + req.body.id);

    result = await connection.execute(
      `select studentid
      from studentguardianrelation
      where guardianid=:id`,
      {
        "id": req.body.id
      }
   );

    const stdid=result.rows[0].STUDENTID;
    result = await connection.execute(
        `select subjectname,ctmarks,htmarks,getadd3(ctmarks,htmarks) total,getg(ctmarks,htmarks) grade
        from result
        where studentid=:id`,
        {
          "id": stdid
        }
    );

    console.log(result);
    //console.log(req.body.password);
    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getresultfromguardian",(req,res)=>{
  console.log(req.body);
  GetResultFromGuardian(req,res);
});

async function GetAttendanceFromStudent(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Student id is: ' + req.body.studentid);

    result = await connection.execute(
        `select subjectname
        from result
        where studentid=:studentid`,
        {
          "studentid": req.body.studentid
        }
    );

    const subjects=[];
    for(let i=0;i<result.rows.length;i++){
      subjects.push(result.rows[i].SUBJECTNAME);
    }

    console.log(subjects);
    const result1=[];
    for(let i=0;i<subjects.length;i++){
      result = await connection.execute(
        `select distinct gettotal1(:studentid,:subject) total,
        getpresent(:studentid,:subject) totalpresent,
        getpercentage2(getpresent(:studentid,:subject),gettotal1(:studentid,:subject)) percentage
        from attendance`,
        {
          "studentid": req.body.studentid,
          "subject": subjects[i]
        }
      );
      const newResult={
        subject: subjects[i],
        total: result.rows[0].TOTAL,
        present: result.rows[0].TOTALPRESENT,
        percen: result.rows[0].PERCENTAGE
      }
      result1.push(newResult);
    }


    console.log(result1);
    //console.log(req.body.password);
    res.send(result1);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getattendancefromstudent",(req,res)=>{
  console.log(req.body);
  GetAttendanceFromStudent(req,res);
});

async function GetAttendanceFromGuardian(req,res) {

  let connection;
  console.log("login e data eseche");

  try {
    connection = await oracledb.getConnection( {
      user          : userInfo,
      password      : mypw,
      connectString : "localhost/ORCL"
    });

    console.log('Guardian id is: ' + req.body.guardianid);

    result = await connection.execute(
      `select studentid
      from studentguardianrelation
      where guardianid=:id`,
      {
        "id": req.body.guardianid
      }
   );

    const stdid=result.rows[0].STUDENTID;

    result = await connection.execute(
        `select subjectname
        from result
        where studentid=:studentid`,
        {
          "studentid": stdid
        }
    );

    const subjects=[];
    for(let i=0;i<result.rows.length;i++){
      subjects.push(result.rows[i].SUBJECTNAME);
    }

    console.log(subjects);
    const result1=[];
    for(let i=0;i<subjects.length;i++){
      result = await connection.execute(
        `select distinct gettotal1(:studentid,:subject) total,
        getpresent(:studentid,:subject) totalpresent,
        getpercentage2(getpresent(:studentid,:subject),gettotal1(:studentid,:subject)) percentage
        from attendance`,
        {
          "studentid": stdid,
          "subject": subjects[i]
        }
      );
      const newResult={
        subject: subjects[i],
        total: result.rows[0].TOTAL,
        present: result.rows[0].TOTALPRESENT,
        percen: result.rows[0].PERCENTAGE
      }
      result1.push(newResult);
    }


    console.log(result1);
    //console.log(req.body.password);
    res.send(result1);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.post("/getattendancefromguardian",(req,res)=>{
  console.log(req.body);
  GetAttendanceFromGuardian(req,res);
});