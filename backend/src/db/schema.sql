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
        'principal',
        'teacher',
        'accountant'
    ) NOT NULL DEFAULT 'admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================
-- INITIAL ADMIN ACCOUNT
-- =========================================

INSERT INTO users (name, email, password, role)
SELECT
    'Royal Crest Principal',
    'principal@royalcrest.edu',
    '$2b$12$qGsDQziq0Q0lp9bPZj3U9evUb0LzBHQS.hGvCpLp3CYXv0mX.J.9K',
    'principal'
FROM dual
WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE email = 'principal@royalcrest.edu'
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


    -- ============================================
-- ROYAL CREST ACADEMY
-- MILESTONE 2: ACADEMIC AND STAFF MANAGEMENT
-- ============================================


-- ============================================
-- 1. ACADEMIC SESSIONS
-- ============================================

CREATE TABLE IF NOT EXISTS academic_sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    session_name VARCHAR(20) NOT NULL UNIQUE,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status ENUM(
        'upcoming',
        'current',
        'completed'
    ) NOT NULL DEFAULT 'upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- 2. ACADEMIC TERMS
-- ============================================

CREATE TABLE IF NOT EXISTS terms (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    session_id INT UNSIGNED NOT NULL,

    term_name ENUM(
        'first',
        'second',
        'third'
    ) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status ENUM(
        'upcoming',
        'current',
        'completed'
    ) NOT NULL DEFAULT 'upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_term_session
        FOREIGN KEY (session_id)
        REFERENCES academic_sessions(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_session_term (
        session_id,
        term_name
    )
);


-- ============================================
-- 3. TEACHER PROFILES
-- ============================================

CREATE TABLE IF NOT EXISTS teacher_profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL UNIQUE,

    staff_number VARCHAR(30) NOT NULL UNIQUE,

    phone VARCHAR(30),

    qualification VARCHAR(150),

    specialization VARCHAR(150),

    employment_date DATE,

    employment_status ENUM(
        'active',
        'on_leave',
        'suspended',
        'resigned'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_teacher_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================
-- 4. SUBJECTS
-- ============================================

CREATE TABLE IF NOT EXISTS subjects (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    subject_code VARCHAR(30) NOT NULL UNIQUE,

    subject_name VARCHAR(150) NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- 5. TEACHER ASSIGNMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS teacher_assignments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    teacher_id INT UNSIGNED NOT NULL,

    class_id INT UNSIGNED NOT NULL,

    subject_id INT UNSIGNED NOT NULL,

    term_id INT UNSIGNED NOT NULL,

    assigned_by INT UNSIGNED NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_assignment_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_assignment_class
        FOREIGN KEY (class_id)
        REFERENCES classes(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assignment_subject
        FOREIGN KEY (subject_id)
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assignment_term
        FOREIGN KEY (term_id)
        REFERENCES terms(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assignment_admin
        FOREIGN KEY (assigned_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    UNIQUE KEY unique_teacher_assignment (
        teacher_id,
        class_id,
        subject_id,
        term_id
    ),

    INDEX idx_assignment_class (class_id),

    INDEX idx_assignment_subject (subject_id),

    INDEX idx_assignment_term (term_id)
);


INSERT INTO academic_sessions (
    session_name,
    start_date,
    end_date,
    status
)
VALUES (
    '2026/2027',
    '2026-09-14',
    '2027-07-23',
    'current'
);

INSERT INTO terms (
    session_id,
    term_name,
    start_date,
    end_date,
    status
)
SELECT
    id,
    'first',
    '2026-09-14',
    '2026-12-18',
    'current'
FROM academic_sessions
WHERE session_name = '2026/2027';


INSERT INTO terms (
    session_id,
    term_name,
    start_date,
    end_date,
    status
)
SELECT
    id,
    'second',
    '2027-01-11',
    '2027-04-02',
    'upcoming'
FROM academic_sessions
WHERE session_name = '2026/2027';


INSERT INTO terms (
    session_id,
    term_name,
    start_date,
    end_date,
    status
)
SELECT
    id,
    'third',
    '2027-04-19',
    '2027-07-23',
    'upcoming'
FROM academic_sessions
WHERE session_name = '2026/2027';

