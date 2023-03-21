export interface Account{
    firstname: string,
    lastname: string,
    username: string;
    email: string, 
    password : any, 
    birthdate: Date | string
    phoneNumber : string, 
    zipcode : string, 
    
    /*
        acc.Firstname = info[0];
        acc.Lastname = info[1];
        acc.Username = info[2];
        acc.Email = info[3];
        acc.Password = info[4];
        acc.Birthdate = new DateTime(1969,10,31);
        //acc.Birthdate = DateTime.Parse(info[5]);
        acc.Zipcode = info[5];
        //acc.Zipcode = info[6];
    */
}