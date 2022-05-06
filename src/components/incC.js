export var count = 1;
export var initialData = ` BEGIN TRANSACTION;
/* Create a table called EMPLOYEES_TERRITORIES */
CREATE TABLE EMPLOYEES_TERRITORIES(TerritoryId integer, EmpId integer, FOREIGN KEY (TerritoryId) REFERENCES TERRITORIES(TerritoryId), FOREIGN KEY (EmpId) REFERENCES EMPLOYEES(EmpId));

/* Create few records in this table */
INSERT INTO EMPLOYEES_TERRITORIES VALUES(1,3);
INSERT INTO EMPLOYEES_TERRITORIES VALUES(2,5);
INSERT INTO EMPLOYEES_TERRITORIES VALUES(3,4);
INSERT INTO EMPLOYEES_TERRITORIES VALUES(4,2);
INSERT INTO EMPLOYEES_TERRITORIES VALUES(5,1);
COMMIT;`

export function countIncr(){
    count+=1;
}

export function mergeQuery(codeData){
    var re = new RegExp(String.fromCharCode(160), "g");

    initialData = initialData +(codeData.replace(re, " "));

    return initialData;
}

