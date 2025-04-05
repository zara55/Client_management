export interface Project {

    id: number,
    projectName: string
    projectDesc: string,
    clientName: string
    startDate: Date,
    endDate: Date,
    projectStatus: string,
    emailId: string,
    mobileNo: number
}

export interface Client {

    id: number,
    firstName: string
    lastName: string,
    companyName: string,
    address:string,
    email: string,
    mobile: number,
    meetingTopic:string,
    scheduleMeeting:Date
}


