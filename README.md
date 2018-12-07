# school-project

MILESTONE 4 STATUS: All required functions are working but there is obvious room for optimization.
TABLE STRUCTURE: USERS
+-------------------+--------------+    
| Column            | Type         |
+-------------------+--------------+
| beername          | varchar PK   |
| type              | varchar(128) |
| description       | text         |
| price             | float        |
| avg               | float        |
| on_tap            | tinyint(1)   |
  
                 FAVORITES
+-------------------+--------------+
| Column            | Type         |
+-------------------+--------------+
| entry             | autu_inc PK  |
| beernam           | varchar(128) |
| username          | varchar(128) |
| rating            | float        |

                 FAVORITES
+-------------------+--------------+
| Column            | Type         |
+-------------------+--------------+
| username          | varchar(128)PK|
| email             | varchar(128) |
| password          | varchar(128) |
| salt              | varchar(128) |
| session_id        | varchar(128) |
