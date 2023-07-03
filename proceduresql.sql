create or replace PROCEDURE "PR_NEW_RECORDS"  IS
file1 utl_file.file_type;
CURSOR CSVC IS
SELECT CAT,SUBCAT,BOREHOLE_NAME,BLOCK_NAME,CREATED_DATE FROM DV_NEW_RECORDS_;
REC CSVC%ROWTYPE;
stmt varchar2(900);
fl_name VARCHAR2(50);
BEGIN 
fl_name:='ABC.CSV' ;
file1 := utl_file.fopen('TEMP_DIR',fl_name,'w');
FOR REC IN CSVC LOOP
stmt := REC.cat||','||
REC.borehole_name||','||
REC.created_date;
utl_file.PUTF(file1, stmt);
utl_file.new_line(file1);
END LOOP;
utl_file.fclose(file1);
END;
