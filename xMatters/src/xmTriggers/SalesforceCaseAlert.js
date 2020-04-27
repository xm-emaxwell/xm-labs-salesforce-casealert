/**
 * xMatters HTTP Trigger that will take input from the provided Salesforce Apex Trigger
 * (xMattersCaseAlert.apxt) and parse information to corresponding xMatters Trigger outputs.
 * 
 * @author: emaxwell@xmatters.com
 * @version: 0.1
 * 
 * If you modify or use as an example to create your own xMatters HTTP Trigger be sure to 
 * create the corresponding outputs for the HTTP Trigger or you will not be able to use in 
 * subsequent steps.
 * 
 */

//Parse payload
var payload = JSON.parse(request.body);

//Field added by provided Apex Trigger indicating if it is a new or updated case
if (payload.reason !== undefined) {
    output['reason'] = payload.reason;
} else {
    output['reason'] = "Unknown";
}

/*
 * STANDARD SALESFORCE CASE FIELDS
 *
 * You can add more standard Salesforce case fields like below. You can send a trigger from
 * Salesforce and in the Activity monitor in Flow Designer view the body of the request to see
 * the other fields that are returned.
*/

if (payload.case != undefined){
    output['caseId'] = payload.case.Id;
    output['caseNumber'] = payload.case.CaseNumber;
    output['caseOrigin'] = payload.case.Origin;
    output['caseStatus'] = payload.case.Status;
    output['caseSubject'] = payload.case.Subject;
    output['caseDescription'] = payload.case.Description;
    output['ownerId'] = payload.case.OwnerId;
    output['creatorId'] = payload.case.CreatedById;
    output['caseCreated'] = payload.case.CreatedDate;
    output['modifierId'] = payload.case.LastModifiedById;
    output['caseModified'] = payload.case.LastModifiedDate;
    output['accountId'] = payload.case.AccountId;
} else {
    throw 'No case information in payload';
    /*
    output['caseId'] = 'Unknown';
    output['caseNumber'] = 'Unknown';
    output['caseOrigin'] = 'Unknown';
    output['caseStatus'] = 'Unknown';
    output['caseSubject'] = 'Unknown';
    output['caseDescription'] = 'Unknown';
    output['ownerId'] = 'Unknown';
    output['creatorId'] = 'Unknown';
    output['caseCreated'] = 'Unknown';
    output['modifierId'] = 'Unknown';
    output['caseModified'] = 'Unknown';
    */
}


/*
 * CUSTOM SALESFORCE CASE FIELDS
 * 
 * You can extract Salesforce custom case fields like below. Remember that
 * custom fields are returned as "<fieldname>__c".  Also make sure to create
 * a corresponding output for the xMatters trigger.
 * 
    if (payload.case.My_Custom_Field__c !== undefined) {
        output['My Custom Output'] = payload.case.My_Custom_Field__c;
    } else {
        output['My Custom Output'] = "Unassigned";
    }
 */


//Extract Salesforce account information
if (payload.case.AccountId !== undefined) {
    if (payload.account !== undefined){
        output['accountName'] = payload.account.Name;
    } else {
        output['accountName'] = "Unassigned";
    }
} else {
    output['accountId'] = "Unassigned";
    output['accountName'] = "Unassigned";
}

//Extract Salesforce case owner information
if (payload.owner !== undefined){
    output['ownerName'] = payload.owner.Name;
    output['ownerEmail'] = payload.owner.Email;
    output['ownerActive'] = payload.owner.IsActive;
} else {
    //throw 'No owner information in payload';
    output['ownerName'] = "Unknown";
    output['ownerEmail'] = "Unknown";
    output['ownerActive'] = "Unknown";
}

//Extract Salesforce case creator information
if (payload.creator !== undefined){
    output['creatorName'] = payload.creator.Name;
    output['creatorEmail'] = payload.creator.Email;
    output['creatorActive'] = payload.creator.IsActive;
} else {
    //throw 'No creator information in payload';
    output['creatorName'] = "Unknown";
    output['creatorEmail'] = "Unknown";
    output['creatorActive'] = "Unknown";
}

//Extract Salesforce case modifier information
if (payload.modifier !== undefined){
    output['modifierName'] = payload.modifier.Name;
    output['modifierEmail'] = payload.modifier.Email;
    output['modifierActive'] = payload.modifier.IsActive;
} else {
    //throw 'No modifier information in payload';
    output['modifierName'] = "Unknown";
    output['modifierEmail'] = "Unknown";
    output['modifierActive'] = "Unknown";
}