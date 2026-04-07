import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Material } from '../models/Material';
import { Quiz } from '../models/Quiz';
import { Enrollment } from '../models/Enrollment';

const seedData = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Material.deleteMany({}),
      Quiz.deleteMany({}),
      Enrollment.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create users
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.create([
      {
        name: 'Dr. Sarah Mitchell',
        email: 'sarah@edutrack.com',
        password: hashedPassword,
        role: 'teacher',
      },
      {
        name: 'Prof. James Chen',
        email: 'james@edutrack.com',
        password: hashedPassword,
        role: 'teacher',
      },
      {
        name: 'Alex Johnson',
        email: 'alex@student.com',
        password: hashedPassword,
        role: 'student',
      },
      {
        name: 'Maria Garcia',
        email: 'maria@student.com',
        password: hashedPassword,
        role: 'student',
      },
      {
        name: 'Admin User',
        email: 'admin@edutrack.com',
        password: hashedPassword,
        role: 'admin',
      },
    ]);
    console.log(`👥 Created ${users.length} users`);

    const [teacher1, teacher2, student1, student2] = users;

    // Create courses
    const courses = await Course.create([
      {
        title: 'Introduction to Web Development',
        description:
          'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Build responsive websites from scratch and understand modern web standards.',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
        teacher: teacher1._id,
        enrollmentCount: 2,
      },
      {
        title: 'Data Structures & Algorithms',
        description:
          'Master essential data structures like arrays, linked lists, trees, and graphs. Learn algorithmic problem-solving techniques used in technical interviews.',
        category: 'Computer Science',
        thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=400',
        teacher: teacher2._id,
        enrollmentCount: 1,
      },
      {
        title: 'Machine Learning Fundamentals',
        description:
          'Explore machine learning concepts from linear regression to neural networks. Hands-on projects with Python, scikit-learn, and TensorFlow.',
        category: 'Artificial Intelligence',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
        teacher: teacher1._id,
        enrollmentCount: 1,
      },
      {
        title: 'Database Management Systems',
        description:
          'Comprehensive course on relational and NoSQL databases. Learn SQL, MongoDB, database design, normalization, and query optimization.',
        category: 'Computer Science',
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
        teacher: teacher2._id,
        enrollmentCount: 0,
      },
      {
        title: 'React.js Masterclass',
        description:
          'Build modern web applications with React.js. Cover hooks, context API, Redux, routing, and best practices for scalable frontend architecture.',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400',
        teacher: teacher1._id,
        enrollmentCount: 0,
      },
      {
        title: 'Cybersecurity Essentials',
        description:
          'Learn the fundamentals of cybersecurity including network security, cryptography, ethical hacking, and security best practices for modern applications.',
        category: 'Cybersecurity',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
        teacher: teacher2._id,
        enrollmentCount: 0,
      },
    ]);
    console.log(`📚 Created ${courses.length} courses`);

    // Create enrollments
    await Enrollment.create([
      { student: student1._id, course: courses[0]._id },
      { student: student1._id, course: courses[2]._id },
      { student: student2._id, course: courses[0]._id },
      { student: student2._id, course: courses[1]._id },
    ]);
    console.log('📝 Created enrollments');

    // Create materials
    await Material.create([
      {
        course: courses[0]._id,
        title: 'HTML Fundamentals',
        type: 'text',
        content:
          'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content.\n\n## Key Concepts\n- Elements and Tags\n- Attributes\n- Document Structure\n- Semantic HTML5 elements\n\n## Getting Started\nCreate a file with .html extension and start with:\n```html\n<!DOCTYPE html>\n<html>\n<head><title>My Page</title></head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>\n```',
        order: 0,
      },
      {
        course: courses[0]._id,
        title: 'CSS Styling Guide',
        type: 'link',
        content: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        order: 1,
      },
      {
        course: courses[0]._id,
        title: 'JavaScript Basics PDF',
        type: 'pdf',
        content: 'https://eloquentjavascript.net/Eloquent_JavaScript.pdf',
        order: 2,
      },
      {
        course: courses[1]._id,
        title: 'Big-O Notation Guide',
        type: 'text',
        content:
          '# Big-O Notation\n\nBig-O notation describes the upper bound of an algorithm\'s time complexity.\n\n## Common Complexities\n- O(1) - Constant\n- O(log n) - Logarithmic\n- O(n) - Linear\n- O(n log n) - Linearithmic\n- O(n²) - Quadratic\n- O(2ⁿ) - Exponential\n\n## Tips\n- Drop constants: O(2n) → O(n)\n- Drop lower-order terms: O(n² + n) → O(n²)',
        order: 0,
      },
      {
        course: courses[2]._id,
        title: 'Introduction to ML',
        type: 'text',
        content:
          '# Machine Learning Overview\n\nMachine Learning is a subset of AI that enables systems to learn from data without being explicitly programmed.\n\n## Types of ML\n1. **Supervised Learning** - Learning from labeled data\n2. **Unsupervised Learning** - Finding patterns in unlabeled data\n3. **Reinforcement Learning** - Learning through trial and error\n\n## Popular Algorithms\n- Linear Regression\n- Decision Trees\n- Random Forests\n- Neural Networks\n- K-Means Clustering',
        order: 0,
      },
    ]);
    console.log('📄 Created study materials');

    // Create quizzes
    await Quiz.create([
      {
        course: courses[0]._id,
        title: 'HTML & CSS Basics Quiz',
        duration: 15,
        questions: [
          {
            questionText: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Hyper Transfer Markup Language',
              'Home Tool Markup Language',
            ],
            correctAnswer: 0,
          },
          {
            questionText: 'Which CSS property is used to change the text color?',
            options: ['font-color', 'text-color', 'color', 'text-style'],
            correctAnswer: 2,
          },
          {
            questionText: 'Which HTML tag is used for the largest heading?',
            options: ['<heading>', '<h6>', '<h1>', '<head>'],
            correctAnswer: 2,
          },
          {
            questionText: 'What is the correct CSS syntax for making all <p> elements bold?',
            options: [
              'p {font-weight: bold;}',
              'p {text-size: bold;}',
              '<p style="font-size: bold;">',
              'p {bold: true;}',
            ],
            correctAnswer: 0,
          },
          {
            questionText: 'Which HTML element is used to define an unordered list?',
            options: ['<ol>', '<li>', '<ul>', '<list>'],
            correctAnswer: 2,
          },
        ],
      },
      {
        course: courses[1]._id,
        title: 'Data Structures Quiz',
        duration: 20,
        questions: [
          {
            questionText: 'What is the time complexity of accessing an element in an array by index?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
            correctAnswer: 1,
          },
          {
            questionText: 'Which data structure uses FIFO (First In, First Out)?',
            options: ['Stack', 'Queue', 'Tree', 'Heap'],
            correctAnswer: 1,
          },
          {
            questionText: 'What is the worst-case time complexity of binary search?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
            correctAnswer: 2,
          },
          {
            questionText: 'Which data structure is used for BFS traversal?',
            options: ['Stack', 'Queue', 'Array', 'Linked List'],
            correctAnswer: 1,
          },
        ],
      },
      {
        course: courses[2]._id,
        title: 'Machine Learning Basics Quiz',
        duration: 15,
        questions: [
          {
            questionText: 'Which type of learning uses labeled data?',
            options: [
              'Unsupervised Learning',
              'Reinforcement Learning',
              'Supervised Learning',
              'Transfer Learning',
            ],
            correctAnswer: 2,
          },
          {
            questionText: 'What algorithm is commonly used for classification?',
            options: [
              'Linear Regression',
              'K-Means',
              'PCA',
              'Logistic Regression',
            ],
            correctAnswer: 3,
          },
          {
            questionText: 'What is overfitting?',
            options: [
              'Model performs well on training data but poorly on new data',
              'Model performs poorly on all data',
              'Model takes too long to train',
              'Model has too few parameters',
            ],
            correctAnswer: 0,
          },
        ],
      },
    ]);
    console.log('🧪 Created quizzes');

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('   Teacher: sarah@edutrack.com / password123');
    console.log('   Teacher: james@edutrack.com / password123');
    console.log('   Student: alex@student.com / password123');
    console.log('   Student: maria@student.com / password123');
    console.log('   Admin:   admin@edutrack.com / password123\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
