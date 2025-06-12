# PawPal

PawPal is a mobile pet care assistant app built with React Native. It helps pet owners manage profiles and receive care reminders for their pets. The app is designed for simplicity, accessibility, and practical use by pet owners with one or more animals.

---

## Design & Purpose

PawPal enables pet owners to:
- Manage multiple pet profiles
- View and complete personalized medical care reminders
- Update their owner profile info securely

Targeted at busy pet owners, PawPal helps ensure that routine care like grooming and medications aren’t forgotten.

---

## Screenshots

A walkthrough of PawPal’s full functionality:

### Home Screen
- Home page to log into the system  
![Home Screen](screenshots/home_screen.png)

### Register Screen
- New user registration with validation  
![Register Screen](screenshots/register_screen.png)

### Registered User View
- Confirmation or redirect after registration  
![Registered User View](screenshots/registered_user_screen.png)

### User Profile Screen
- Welcome page with navigation to My Profile, Pets, and Reminders  
![User Profile Screen](screenshots/user_profile_screen.png)

### Owner Profile Screen
- View and update name, phone number, and password  
![Owner Profile Screen](screenshots/owner_profile_screen.png)

### Update Profile Screen
- Confirmation view after updating profile  
![Update Profile Screen](screenshots/update_profile_screen.png)

### Add Pet Screen
- Add a new pet with name, type, age, etc.  
![Add Pet Screen](screenshots/add_pet_screen.png)

### Pet Added Confirmation
- Confirmation after adding a new pet  
![Pet Added Confirmation](screenshots/pet_added_screen.png)

### Pet Manager Screen
- View all pets registered to the user  
![Pet Manager Screen](screenshots/pet_manager_screen.png)

### Pet Manager After Add
- Refreshed list showing newly added pet  
![Pet Manager After Add](screenshots/pet_manager_screen_after_add.png)

### Pet Details Screen
- View details like microchip, implant date, medical records  
![Pet Details Screen](screenshots/pet_details_screen.png)

### Edit Pet Details
- Edit age, microchip number, and implant date  
![Edit Pet Details](screenshots/edit_pet_details.png)

### Edited Pet Details
- Confirmation or updated view after editing  
![Edited Pet Details](screenshots/edited_pet_details.png)

### Delete Pet
- Delete button interaction  
![Delete Pet Flow](screenshots/delete_pet.png)

### Deleted Pet View
- Confirmation of pet deletion  
![Deleted Pet View](screenshots/deleted_pet.png)

### Add Medical Reminder
- Form to add new medical/grooming reminder  
![Add Medical Reminder](screenshots/add_medical_reminder.png)

### Added Medical Reminder
- Confirmation or visual of added reminder  
![Added Medical Reminder](screenshots/added_medical_reminder.png)

### Medical Reminders Screen
- View reminders sorted by urgency  
![Medical Reminders Screen](screenshots/medical_reminders_screen.png)

### Mark Medical Reminder Done
- Tap to mark as completed  
![Mark Medical Reminder Done](screenshots/medical_reminder_done.png)

### Updated Pet Details
- View showing pet data after update  
![Updated Pet Details](screenshots/updated_pet_details.png)
---

## Server API Design & Specification

All backend services are built using PHP and integrated with an SQLite database.

### `register_user.php`
- **Method**: `POST`
- **Params**: `username`, `password`, `name`, `phone`

### `login.php`
- **Method**: `POST`
- **Params**: `username`, `password`

### `get_user.php`
- **Method**: `GET`
- **Params**: `username`

### `update_user.php`
- **Method**: `POST`
- **Params**: `username`, `name`, `phone`, `password`

### `add_pet.php`, `get_pets.php`, `delete_pet.php`, `update_pet.php`, `get_pet_detail.php`
- Manage pet profiles

### `get_reminders.php`, `mark_reminder_done.php`
- Manage grooming/medical reminders

---

## Medical Reminders Feature

The **Medical Reminders** screen shows upcoming pet care tasks such as:
- Nail trimming
- Hair grooming
- Vaccination schedules
- Regular checkups
- Insurance payments

Reminders are shown in order of urgency (soonest due date first), and users can **mark tasks as done** with a tap.

### `get_reminders.php`
- **Method**: `GET`
- **Params**: `username`
- **Returns**: Sorted list of active reminders by urgency

### `mark_reminder_done.php`
- **Method**: `POST`
- **Params**: `reminder_id`
- **Marks a reminder as complete**

---

## API Call Example

**Endpoint:**  
`GET http://localhost/PawPal/register_user.php?username=testuser&password=12345`

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}```
---

## Experiences

### Key Features Implemented
- Frontend with 7+ screens using React Native
- Owner login/register and profile updates
- Pet profile CRUD operations
- Urgent medical reminder tracking

### Techniques Used
- Navigation and route params
- RESTful fetch to PHP APIs
- SQLite backend and hashed password security
- List filtering and conditional rendering

### Challenges
- Expo dev client compatibility with notifications
- Real-time syncing of reminder updates
- Maintaining platform consistency

### Future Plans
- Add calendar integration for reminders
- Let users create custom reminder types
- Profile images and cloud backup

---

## Project Structure

```
screens/
  ├── HomeScreen.js
  ├── UserProfileScreen.js
  ├── OwnerProfileScreen.js
  ├── AddPetScreen.js
  ├── PetManagerScreen.js
  ├── PetDetailScreen.js
  ├── EditPetScreen.js
  ├── ReminderScreen.js
  ├── AddMedicalRecordScreen.js

htdocs/PawPal/
  ├── connect.php
  ├── register_user.php
  ├── login.php
  ├── get_user.php
  ├── update_user.php
  ├── add_pet.php
  ├── update_pet.php
  ├── delete_pet.php
  ├── get_pet_detail.php
  ├── get_pets.php
  ├── get_reminders.php
  └── mark_reminder_done.php
  ├── get_pet_records.php
  └── add_medical_record.php
```
All backend files are copied to server_php folder for submission
---

## Team

- Subhalakshmi Ramasundaram (solo project)
