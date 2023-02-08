# Pseudo-Code (Sözde Kod)

* ## User Create (Kullanıcı Oluştur)

> The user who does not have an account will fill in the required fields in the user model and then the user will be registered in the system and a verification mail will be sent. Users who click on the link in this e-mail will be able to log in to the system. If the user's email address and credentials conflict with another user, user creation is not allowed. (Hesabı olmayan kullanıcı, kullanıcı modelinde gerekli alanları dolduracak ve daha sonra kullanıcı sisteme kayıt olacak ve doğrulama maili gönderilecektir. Bu e-postadaki linke tıklayan kullanıcılar sisteme giriş yapabileceklerdir. Kullanıcının e-posta adresi ve kimlik bilgileri başka bir kullanıcı ile çakışırsa, kullanıcı oluşturulmasına izin verilmez.)

* ## User Login (Kullanıcı Girişi)

> Users who want to log in can log in if their password and e-mail address are compatible and the isMail field is true. (Giriş yapmak isteyen kullanıcılar, şifreleri ve e-posta adresleri uyumlu ve isMail alanı doğru ise giriş yapabilirler.)

* ## Pharmacy Create (Eczane Oluştur)

> If the user wants, they can create users who can log into the system under the role of emplooye under the pharmacy and these users will be associated with the pharmacy. the pharmacy is defined as the workplace of the user who created it (Kullanıcı isterse eczane altında çalışan rolü altında sisteme giriş yapabilecek kullanıcılar oluşturabilir ve bu kullanıcılar eczane ile ilişkilendirilir. eczane, onu oluşturan kullanıcının işyeri olarak tanımlanır)

* ## Pharmacy View and Update (Eczane Gözlemle ve Güncelle)

> the user in the manager role can only view and update the pharmacies she has created (yönetici rolündeki kullanıcı sadece kendi oluşturduğu eczaneleri görüntüleyebilir ve güncelleyebilir.)

> Users in admin and developer roles can view and update all pharmacies. (Yönetici ve geliştirici rollerindeki kullanıcılar tüm eczaneleri görüntüleyebilir ve güncelleyebilir.)

> Users in the emplooye role can only see and update the pharmacies they are connected to. (Çalışan rolündeki kullanıcılar sadece bağlı oldukları eczaneleri görebilir ve güncelleyebilir.)

* ## Medicine Create (İlaç Oluştur)

> The user in the role of manager or emplooye will fill in the required fields in the drug model to create the drugs to be sold in the pharmacy and complete the registration process successfully. (Yönetici veya çalışan rolündeki kullanıcı, eczanede satılacak ilaçları oluşturmak için ilaç modelinde gerekli alanları dolduracak ve kayıt işlemini başarıyla tamamlayacaktır.)

* ## Medicine View and Update (İlaç Gözlemle ve Güncelle)

> the user in the manager role can only view and update the pharmacies' medicines she has created. (yönetici rolündeki kullanıcı, yalnızca kendi oluşturduğu eczanelerin ilaçlarını görüntüleyebilir ve güncelleyebilir.)

> Users in admin and developer roles can view and update all medicines. (Yönetici ve geliştirici rollerindeki kullanıcılar tüm ilaçları görüntüleyebilir ve güncelleyebilir.)

> Users in the emplooye role can only see and update the pharmacies' medicines they are connected to. (Çalışan rolündeki kullanıcılar sadece bağlı oldukları eczanelerin ilaçlarını görebilir ve güncelleyebilir.)

* ## Prescription Create (Reçete Oluştur)

> The user in the customer role will fill in the required fields in the model for the recipe information and upload it to the system. The system will display the most appropriate pharmacy information for the user and the user in the role of customer will place an order from the pharmacy of his choice. (Müşteri rolündeki kullanıcı reçete bilgisi için modelde gerekli alanları dolduracak ve sisteme yükleyecektir. Sistem kullanıcıya en uygun eczane bilgilerini gösterecek ve müşteri rolündeki kullanıcı istediği eczaneden sipariş verecektir.)

* ## Prescription View and Update (Reçete Gözlemle ve Güncelle)

> the user in the customer role can only see and observe the Prescription she has created (müşteri rolündeki kullanıcı sadece kendi oluşturduğu Reçeteyi görebilir ve gözlemleyebilir.)

> Users in admin and developer roles can view and update all Prescription. (Yönetici ve geliştirici rollerindeki kullanıcılar tüm reçeteleri görüntüleyebilir ve güncelleyebilir.)


* ## Order Create (Sipariş Oluştur)

> The user in the role of customer will order the drugs he/she requests from the pharmacy. (Müşteri rolündeki kullanıcı eczaneden istediği ilaçları sipariş edecektir.)

* ## Vendors Create (bayi Oluştur)

> Users in manager and developer roles will vendors in the required fields in the vendors model and register the vendors companies that will carry the orders. Pharmacies carry their orders with the vendors companies they want . (Yönetici ve geliştirici rollerindeki kullanıcılar, bayi modelinde gerekli alanlara bayileri atar ve siparişleri taşıyacak bayi firmalarını kaydeder. Eczaneler siparişlerini istedikleri bayi firmaları ile taşırlar.)

* ## Vendors View and Update (Bayi Gözlemle ve Güncelle)

> Users in admin and developer roles can view and update all vendors. (Yönetici ve geliştirici rollerindeki kullanıcılar, tüm bayileri görüntüleyebilir ve güncelleyebilir.)


