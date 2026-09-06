-- =========================================
-- ROYAL CREST SCHOOL MANAGEMENT SYSTEM
-- DATABASE SCHEMA
-- =========================================

-- -----------------------------------------
-- USERS
-- -----------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM(
        'admin',
        'teacher',
        'accountant'
    ) NOT NULL DEFAULT 'admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- -----------------------------------------
-- PARENTS / GUARDIANS
-- -----------------------------------------

CREATE TABLE IF NOT EXISTS parents (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    email VARCHAR(150),

    relationship VARCHAR(50) NOT NULL,

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- -----------------------------------------
-- CLASSES
-- -----------------------------------------

CREATE TABLE IF NOT EXISTS classes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    level ENUM(
        'primary',
        'junior_secondary',
        'senior_secondary'
    ) NOT NULL,

    class_teacher_id INT UNSIGNED NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_class_teacher
        FOREIGN KEY (class_teacher_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);


-- -----------------------------------------
-- ADMISSION APPLICATIONS
-- -----------------------------------------

CREATE TABLE IF NOT EXISTS admission_applications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    application_number VARCHAR(30) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    other_name VARCHAR(100),

    date_of_birth DATE NOT NULL,

    gender ENUM(
        'male',
        'female'
    ) NOT NULL,

    passport_photo VARCHAR(255),

    desired_class VARCHAR(100) NOT NULL,

    previous_school VARCHAR(200),

    parent_name VARCHAR(150) NOT NULL,

    parent_phone VARCHAR(30) NOT NULL,

    parent_email VARCHAR(150),

    parent_relationship VARCHAR(50) NOT NULL,

    address TEXT NOT NULL,

    status ENUM(
        'pending',
        'under_review',
        'accepted',
        'rejected'
    ) NOT NULL DEFAULT 'pending',

    admin_notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- -----------------------------------------
-- STUDENTS
-- -----------------------------------------

CREATE TABLE IF NOT EXISTS students (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    student_id VARCHAR(30) NOT NULL UNIQUE,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    other_name VARCHAR(100),

    date_of_birth DATE NOT NULL,

    gender ENUM(
        'male',
        'female'
    ) NOT NULL,

    class_id INT UNSIGNED NULL,

    parent_id INT UNSIGNED NULL,

    admission_date DATE NOT NULL,

    status ENUM(
        'active',
        'inactive',
        'graduated',
        'withdrawn'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_student_parent
        FOREIGN KEY (parent_id)
        REFERENCES parents(id)
        ON DELETE SET NULL
);


-- =========================================
-- INITIAL CLASSES
-- =========================================

INSERT INTO classes (name, level)
VALUES
    ('Primary 1', 'primary'),
    ('Primary 2', 'primary'),
    ('Primary 3', 'primary'),
    ('Primary 4', 'primary'),
    ('Primary 5', 'primary'),
    ('Primary 6', 'primary'),

    ('JSS 1', 'junior_secondary'),
    ('JSS 2', 'junior_secondary'),
    ('JSS 3', 'junior_secondary'),

    ('SS 1', 'senior_secondary'),
    ('SS 2', 'senior_secondary'),
    ('SS 3', 'senior_secondary');