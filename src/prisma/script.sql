CREATE TABLE Book (
  id TEXT not null,
  title TEXT not null,
  isbn TEXT not null,
  pages INTEGER not null,
  chapters INTEGER not null,
  price REAL not null,
  description TEXT,
  imgUri TEXT,
  unique(isbn),
  primary key (id)
);

CREATE TABLE Author (
  id TEXT not null,
  name TEXT not null,
  email TEXT not null,
  about TEXT ,
  imgUri TEXT,
  unique(email),
  primary key (id)
);

CREATE TABLE _BooksToAuthors (
  id TEXT not null,
  bookId TEXT not null,
  authorId TEXT not null,
  primary key (id),
  foreign key (bookId) references Book(id) ON DELETE CASCADE,
  foreign key (authorId) references Author(id)  ON DELETE CASCADE
);

CREATE TABLE Reader (
  id TEXT not null,
  name TEXT not null,
  email TEXT not null,
  costumerId TEXT NOT null,
  address TEXT,
  phone INTEGER,
  imgUri TEXT,
  unique(email),
  unique(phone),
  primary key (id)
);

CREATE TABLE _BooksToReaders (
  id TEXT not null,
  borrowDate TEXT not null,
  returnDate TEXT not null,
  returned BOOLEAN not null,
  bookId TEXT not null,
  readerId TEXT not null,
  primary key (id),
  foreign key (bookId) references Book(id) ON DELETE CASCADE,
  foreign key (readerId) references Reader(id)  ON DELETE CASCADE
);

CREATE TABLE Storage (
  id TEXT not null,
  bookId TEXT not null,
  quantity INTEGER not null,
  borrowedQuantity INTEGER not null CHECK (quantity >= borrowedQuantity),
  primary key (id),
  foreign key (bookId) references Book(id)  ON DELETE CASCADE
);


insert into Book values
 ('1','GraphQL book1',"123-4-56782-349-2", 101, 102, 1.3,"Integer in libero vitae lorem consectetur rutrum at a turpis. Aliquam mi nisl, placerat at bibendum at...", "book1.png"),
 ('2','GraphQL book2',"123-4-56785-534-9", 201, 202, 2.3,"Mauris dapibus a ante et pellentesque. Pellentesque iaculis pellentesque tortor ac mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed pretium ultricies eros vel sodales. ", "book2.png"),
 ('3','GraphQL book3',"123-4-56788-790-6", 301, 302, 3.3,"Pellentesque fringilla nibh non sem ultrices hendrerit. Nunc pellentesque quis libero vel dignissim...", "book3.png"),
 ('4','GraphQL book4',"123-4-56784-029-1", 401, 402, 4.3,"Sed et finibus ante. Etiam et elementum elit. Sed suscipit, enim a pellentesque laoreet, urna ante bibendum ante, id molestie ipsum mi consectetur ligula. Donec commodo arcu vitae ante porta imperdiet eu eget dui. ", "book4.png"),
 ('5','GraphQL book5',"123-4-56780-199-5", 501, 502, 5.3,"Curabitur sit amet tellus risus. Maecenas dictum neque in nibh dapibus, sit amet molestie nibh sodales. Nullam ut velit in lectus blandit lobortis. Fusce ullamcorper tellus at lacus interdum, sed tempus sem porttitor.", "book5.png"),
 ('6','GraphQL book6',"123-4-56788-398-4", 601, 602, 6.3,"Duis sodales tristique mauris sit amet aliquet. Nulla ac molestie justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sed tincidunt felis. Pellentesque eget nibh volutpat, elementum erat ut, placerat arcu. ", "book6.png"),
 ('7','GraphQL book7',"123-4-56784-699-6", 701, 702, 7.3,"Maecenas eget ante sit amet ante convallis consectetur. Nullam venenatis ut nisl sed luctus. Cras egestas condimentum diam in egestas. Integer imperdiet elit eget elit maximus ultricies. Aliquam tempus ligula vestibulum sollicitudin dictum. ", "book7.png"),
 ('8','GraphQL book8',"123-4-56783-712-3", 801, 802, 8.3,"Integer iaculis laoreet turpis, vitae faucibus dolor fringilla eget. Proin molestie nunc lorem, in pharetra sem faucibus in. In ut justo non lacus faucibus molestie. ", "book8.png"),
 ('9','GraphQL book9',"123-4-56786-592-8", 901, 902, 9.3,"In nec cursus elit, at bibendum odio. Integer enim dui, tempor sed iaculis vitae, gravida nec velit. Duis lobortis ante in orci consequat tristique. Nulla laoreet laoreet nisl ac laoreet. ", "book9.png"),
 ('10','GraphQL book10',"123-4-56788-785-2" , 1001, 1002, 10.3,"Praesent sed lobortis turpis. Phasellus id ultricies velit. Sed sem nulla, tincidunt in euismod et, placerat quis velit. Nulla blandit erat et elit dignissim, vitae porttitor sem faucibus.", null);


insert into Author values 
 ('1','Author1', 'a@a.com',"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod fermentum purus sed pellentesque." , "person1.png"),
 ('2','Author2', 'b@b.com',"Etiam dignissim felis at eros bibendum, ac pellentesque arcu ullamcorper. Maecenas sit amet purus augue. ", "person2.png"),
 ('3','Author3', 'c@c.com',"Vivamus vel finibus libero, ornare auctor ipsum. Fusce at posuere nunc. Aliquam et molestie tortor. ", "person3.png"),
 ('4','Author4', 'd@d.com',"Pellentesque vestibulum libero sed lacus tempor porta. Integer pulvinar diam eu nisi pharetra fringilla non vitae nulla. ", "person4.png"),
 ('5','Author5', 'e@e.com',"Curabitur eget ligula tempor dolor porta pellentesque a eu turpis. Quisque pulvinar dignissim diam vel tincidunt. ", "person5.png"),
 ('6','Author6', 'f@f.com',"Duis sodales magna non pretium fermentum. Nullam faucibus odio eget dignissim sagittis. Suspendisse sollicitudin, est a tincidunt tempus.", "person6.png"),
 ('7','Author7', 'g@g.com',"Velit ex tempor turpis, eget semper ipsum diam eget ligula. Integer et tristique lorem, ut condimentum diam. ", "person7.png");


  insert into _BooksToAuthors values 
  ('1', '1', '1'),
  ('2', '1', '3'),
  ('3', '1', '5'),
  ('4', '2', '2'),
  ('5', '2', '4'),
  ('6', '2', '6'),
  ('7', '3', '3'),
  ('8', '3', '5'),
  ('9', '4', '4'),
  ('10', '4', '6'),
  ('11', '5', '1'),
  ('12', '6', '2'),
  ('13', '7', '1'),
  ('14', '7', '3'),
  ('15', '8', '2'),
  ('16', '8', '4'),
  ('17', '9', '1'),
  ('18', '9', '3'),
  ('19', '9', '5'),
  ('20', '10', '2'),
  ('21', '10', '4'),
  ('22', '10', '6'),
  ('23', '1', '7'),
  ('24', '2', '7'),
  ('25', '3', '7'),
  ('26', '4', '7'),
  ('27', '5', '7'),
  ('28', '6', '7'),
  ('29', '7', '7'),
  ('30', '8', '7'),
  ('31', '9', '7'),
  ('32', '10', '7');





insert into Reader values 
 ('1','Reader1', 'reader_1@f.com','ckh3l0w0u3955p8v8kb11efc51','Adr1 b11efc51 str b11efc51','12300001', "person1.png"),
 ('2','Reader2', 'reader_2@f.com','ckh3l105k3979p8v8kjkgm3qsk','Adr2 jkgm3qsk str jkgm3qsk','12300002', "person2.png"),
 ('3','Reader3', 'reader_3@f.com','ckh3l14jh4003p8v8koacdk8n6','Adr3 oacdk8n6 str oacdk8n6','12300003', "person3.png"),
 ('4','Reader4', 'reader_4@f.com','ckh3l3au24054p8v8krf9qnwr7','Adr4 rf9qnwr7 str rf9qnwr7','12300004', "person4.png"),
 ('5','Reader5', 'reader_5@f.com','ckh3l3eyk4078p8v8kxpg1rwg3','Adr5 xpg1rwg3 str xpg1rwg3','12300005', "person5.png"),
 ('6','Reader6', 'reader_6@f.com','ckh3l3k7u4102p8v8k0n1ikorn','Adr6 0n1ikorn str 0n1ikorn','12300006', "person6.png"),
 ('7','Reader7', 'reader_7@f.com','ckh3l3oea4126p8v8ktqqnkqhy','Adr7 tqqnkqhy str tqqnkqhy','12300007', "person7.png"),
 ('8','Reader8', 'reader_8@f.com','ckh3l3ta04150p8v8kt0inzn2v','Adr8 t0inzn2v str t0inzn2v','12300008', "person8.png"),
 ('9','Reader9', 'reader_9@f.com','ckh3l3zhc4174p8v8kc4gcxok8','Adr9 c4gcxok8 str c4gcxok8','12300009', "person9.png"),
 ('10','Reader10', 'reader_10@f.com','ckh3l44824198p8v8kotdx0bz8','Adr10 otdx0bz8 str otdx0bz8','12300010' , null);

  insert into _BooksToReaders values 
  ( '1' , '2020-01-02T23:00:00.000Z', '2020-01-08T23:00:00.000Z', true, '5', '5' ),
  ( '2' , '2020-01-03T23:00:00.000Z', '2020-01-10T23:00:00.000Z', true, '1', '8' ),
  ( '3' , '2020-01-03T23:00:00.000Z', '2020-01-06T23:00:00.000Z', true, '8', '5' ),
  ( '4' , '2020-01-04T23:00:00.000Z', '2020-01-12T23:00:00.000Z', true, '4', '9' ),
  ( '5' , '2020-01-04T23:00:00.000Z', '2020-01-04T23:00:00.000Z', true, '2', '6' ),
  ( '6' , '2020-01-05T23:00:00.000Z', '2020-01-09T23:00:00.000Z', true, '6', '6' ),
  ( '7' , '2020-01-08T23:00:00.000Z', '2020-01-17T23:00:00.000Z', true, '8', '1' ),
  ( '8' , '2020-01-09T23:00:00.000Z', '2020-01-13T23:00:00.000Z', true, '3', '5' ),
  ( '9' , '2020-01-09T23:00:00.000Z', '2020-01-12T23:00:00.000Z', true, '7', '8' ),
  ( '10' , '2020-01-12T23:00:00.000Z', '2020-01-13T23:00:00.000Z', true, '6', '6' ),
  ( '11' , '2020-01-13T23:00:00.000Z', '2020-01-14T23:00:00.000Z', true, '9', '2' ),
  ( '12' , '2020-01-15T23:00:00.000Z', '2020-01-17T23:00:00.000Z', true, '7', '4' ),
  ( '13' , '2020-01-16T23:00:00.000Z', '2020-01-17T23:00:00.000Z', true, '3', '6' ),
  ( '14' , '2020-01-18T23:00:00.000Z', '2020-01-23T23:00:00.000Z', true, '2', '10' ),
  ( '15' , '2020-01-19T23:00:00.000Z', '2020-01-20T23:00:00.000Z', true, '1', '3' ),
  ( '16' , '2020-01-20T23:00:00.000Z', '2020-01-27T23:00:00.000Z', true, '6', '4' ),
  ( '17' , '2020-01-20T23:00:00.000Z', '2020-01-25T23:00:00.000Z', true, '9', '1' ),
  ( '18' , '2020-01-21T23:00:00.000Z', '2020-01-31T23:00:00.000Z', true, '7', '8' ),
  ( '19' , '2020-01-21T23:00:00.000Z', '2020-01-26T23:00:00.000Z', true, '3', '6' ),
  ( '20' , '2020-01-21T23:00:00.000Z', '2020-01-26T23:00:00.000Z', true, '4', '7' ),
  ( '21' , '2020-01-25T23:00:00.000Z', '2020-01-27T23:00:00.000Z', true, '5', '10' ),
  ( '22' , '2020-01-25T23:00:00.000Z', '2020-01-27T23:00:00.000Z', true, '8', '5' ),
  ( '23' , '2020-01-28T23:00:00.000Z', '2020-02-06T23:00:00.000Z', true, '2', '3' ),
  ( '24' , '2020-01-29T23:00:00.000Z', '2020-02-02T23:00:00.000Z', true, '6', '2' ),
  ( '25' , '2020-01-31T23:00:00.000Z', '2020-02-10T23:00:00.000Z', true, '9', '8' ),
  ( '26' , '2020-01-31T23:00:00.000Z', '2020-02-01T23:00:00.000Z', true, '4', '6' ),
  ( '27' , '2020-02-01T23:00:00.000Z', '2020-02-02T23:00:00.000Z', true, '5', '3' ),
  ( '28' , '2020-02-03T23:00:00.000Z', '2020-02-08T23:00:00.000Z', true, '7', '4' ),
  ( '29' , '2020-02-03T23:00:00.000Z', '2020-02-06T23:00:00.000Z', true, '3', '10' ),
  ( '30' , '2020-02-04T23:00:00.000Z', '2020-02-04T23:00:00.000Z', true, '6', '1' ),
  ( '31' , '2020-02-05T23:00:00.000Z', '2020-02-15T23:00:00.000Z', true, '5', '9' ),
  ( '32' , '2020-02-05T23:00:00.000Z', '2020-02-06T23:00:00.000Z', true, '8', '2' ),
  ( '33' , '2020-02-06T23:00:00.000Z', '2020-02-07T23:00:00.000Z', true, '4', '9' ),
  ( '34' , '2020-02-06T23:00:00.000Z', '2020-02-06T23:00:00.000Z', true, '6', '9' ),
  ( '35' , '2020-02-08T23:00:00.000Z', '2020-02-09T23:00:00.000Z', true, '6', '2' ),
  ( '36' , '2020-02-08T23:00:00.000Z', '2020-02-09T23:00:00.000Z', true, '3', '7' ),
  ( '37' , '2020-02-10T23:00:00.000Z', '2020-02-16T23:00:00.000Z', true, '8', '2' ),
  ( '38' , '2020-02-10T23:00:00.000Z', '2020-02-15T23:00:00.000Z', true, '7', '4' ),
  ( '39' , '2020-02-12T23:00:00.000Z', '2020-02-18T23:00:00.000Z', true, '4', '1' ),
  ( '40' , '2020-02-13T23:00:00.000Z', '2020-02-18T23:00:00.000Z', true, '6', '9' ),
  ( '41' , '2020-02-13T23:00:00.000Z', '2020-02-18T23:00:00.000Z', true, '9', '3' ),
  ( '42' , '2020-02-15T23:00:00.000Z', '2020-02-18T23:00:00.000Z', true, '1', '7' ),
  ( '43' , '2020-02-16T23:00:00.000Z', '2020-02-18T23:00:00.000Z', true, '3', '1' ),
  ( '44' , '2020-02-17T23:00:00.000Z', '2020-02-22T23:00:00.000Z', true, '7', '5' ),
  ( '45' , '2020-02-17T23:00:00.000Z', '2020-02-17T23:00:00.000Z', true, '5', '5' ),
  ( '46' , '2020-02-18T23:00:00.000Z', '2020-02-23T23:00:00.000Z', true, '2', '3' ),
  ( '47' , '2020-02-19T23:00:00.000Z', '2020-02-25T23:00:00.000Z', true, '5', '8' ),
  ( '48' , '2020-02-20T23:00:00.000Z', '2020-02-25T23:00:00.000Z', true, '8', '10' ),
  ( '49' , '2020-02-20T23:00:00.000Z', '2020-02-21T23:00:00.000Z', true, '6', '4' ),
  ( '50' , '2020-02-21T23:00:00.000Z', '2020-02-26T23:00:00.000Z', true, '9', '8' ),
  ( '51' , '2020-02-23T23:00:00.000Z', '2020-02-25T23:00:00.000Z', true, '6', '7' ),
  ( '52' , '2020-02-25T23:00:00.000Z', '2020-03-01T23:00:00.000Z', true, '1', '1' ),
  ( '53' , '2020-03-01T23:00:00.000Z', '2020-03-05T23:00:00.000Z', false, '9', '7' ),
  ( '54' , '2020-02-01T23:00:00.000Z', '2020-02-15T23:00:00.000Z', false, '1', '2' ),
  ( '55' , '2020-03-01T23:00:00.000Z', '2020-03-15T23:00:00.000Z', false, '2', '2' ),
  ( '56' , '2020-04-01T22:00:00.000Z', '2020-04-15T22:00:00.000Z', false, '3', '2' ),
  ( '57' , '2020-05-01T22:00:00.000Z', '2020-05-15T22:00:00.000Z', false, '4', '2' );

insert into Storage values
 ('1','1', 2, 0),
 ('2','2', 2, 0),
 ('3','3', 2, 0),
 ('4','4', 2, 0),
 ('5','5', 2, 0),
 ('6','6', 2, 0),
 ('7','7', 2, 0),
 ('8','8', 2, 0),
 ('9','9', 2, 0),
 ('10','10', 2, 0);

PRAGMA foreign_keys = ON;



SELECT *
FROM author a
WHERE NOT EXISTS(
		 SELECT *
		 FROM book b
		 WHERE NOT EXISTS(
				  SELECT *
				  FROM _BooksToAuthors bk_ar
				  WHERE bk_ar.bookId=b.id AND bk_ar.authorId=a.id
				  )
		 )
;


 UPDATE book
SET title = 'book1 updated'
WHERE id = "1"; 