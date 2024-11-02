import React, { useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Code, Web, Build,School,Work,Check } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import TodoView from './Components/todo-container/TodoView'
import CarouselView from './Components/Carousel/Carousel';
import TaskManager from './Components/table-manager-reducer/TaskManager';
import TickTacToe from './Components/tick-tac-toe/ticktacktoe';

const APP_BAR_HEIGHT = 64;

const projects = [
  { title:'Merkensoft', description: 'An intermediate platform connecting customers and contractors.', details: 'Init: The Merkensoft project was initiated to address the growing need for an efficient platform that bridges the gap between customers seeking contracting services and contractors offering their expertise. Our goal was to create a user-friendly website that simplifies the contracting process and enhances communication.' },
  { component: <TodoView />  , title: 'Todo List', description: 'Todo application', details: 'The todo application allows users to add, delete, and toggle the completion status of tasks. It features filtering options to view all, active, or completed todos. State management is handled using React context and a reducer with Immer for immutability' },
  { component: < CarouselView/>  ,title: 'Carousel', description: 'The carousel showcases a dynamic collection of items', details: 'Allowing users to effortlessly browse through content by sliding left or right, with smooth transitions and intuitive navigation controls for an engaging visual experience.' },
  { component: < TaskManager/>  ,title: 'Task Manager', description: 'Organize and manage nutritional items', details: 'This Task Manager is particularly useful for dietitians, nutritionists, or anyone looking to keep track of various nutritional items and their details systematically. It can help in meal planning, dietary assessments, and education on nutrition.' },
  { component: < TickTacToe/>  ,title: ' Tick Tac Toe', description: 'Organize and manage nutritional items', details: 'This Task Manager is particularly useful for dietitians, nutritionists, or anyone looking to keep track of various nutritional items and their details systematically. It can help in meal planning, dietary assessments, and education on nutrition.' },

];

 const skills = [
  { label: 'JavaScript', icon: <Code /> },
  { label: 'Ruby', icon: <Code /> }, 
  { label: 'HTML', icon: <Web /> },
  { label: 'CSS', icon: <Web /> },  
  { label: 'React JS', icon: <Build /> },
  { label: 'Redux', icon: <Build /> },
  { label: 'MUI', icon: <Build /> }, 
];

const educationData = [
  { degree: 'M.Sc. in Mathematics', institution: 'Bharathiyar University', years: '2022-2024' },
  { degree: 'B.Sc. in Mathematics', institution: 'Bharathiyar University', years: '2019-2022' },
];

const experiences = [
  {
    title: 'React.js Developer Intern',
    company: 'Drylogics, Coimbatore',
    duration: 'May 2024 – Present',
    responsibilities: [
      'MerkenSoft An intermediate platform connecting customers and contractors.',
      'Developed a To-Do List App for task management.',
      'Created an interactive Tic Tac Toe Game with MUI.',
      'Built a Task Manager for efficient data handling.',
    ],
  },
];

const ProjectCard: React.FC<{ project: any; onClick: () => void }> = ({ project, onClick }) => (
  <Card onClick={onClick} sx={{ cursor: 'pointer', boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{project.title}</Typography>
      <Typography>{project.description}</Typography>
      {project.component}
    </CardContent>
  </Card>
);

const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const carouselRef = useRef<any>(null);

  const handleOpen = (project: any) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <Card ref={ref} sx={{ padding: 2, backgroundColor: '#e3f2fd', marginTop: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">Projects</Typography>
        <Box sx={{ position: 'relative' }}>
          <Carousel  sx={{ padding: 1 }}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onClick={() => handleOpen(project)}
              />
            ))}
          </Carousel>
          <IconButton onClick={scrollLeft} sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={scrollRight} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedProject?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedProject?.details}</Typography>
          {selectedProject?.component}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
});

const Init = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, marginTop: 10 }}>
    <CardContent>
      <Typography variant="h5">Initialization</Typography>
      <Typography>
        This portfolio showcases my journey as a React.js developer, highlighting projects, skills, and experience. 
        I aim to provide a comprehensive view of my capabilities and the innovative solutions I can offer.
      </Typography>
    </CardContent>
  </Card>
));



const Objective = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, backgroundColor: '#e3f2fd', marginTop: 2   }}>
    <CardContent>
      <Typography variant="h5">Objective</Typography>
      <Typography>
        Innovative React.js developer with a strong foundation in mathematics.
      </Typography>
    </CardContent>
  </Card>
));

const Education = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, marginTop: 2, boxShadow: 3 }}>
  <CardContent>
    <Typography variant="h5" sx={{ marginBottom: 2 }}>
      Education
    </Typography>
    <Grid container spacing={2}>
      {educationData.map((item, index) => (
        <Grid item xs={12} key={index}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <School sx={{ marginRight: 1 }} />
            <div>
              <Typography variant="subtitle1">{item.degree}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.institution}, {item.years}
              </Typography>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>
));

const TechnicalSkills = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, backgroundColor: '#e3f2fd', marginTop: 2, boxShadow: 3 }}>
  <CardContent>
    <Typography variant="h5" sx={{ marginBottom: 2 }}>Technical Skills</Typography>
    <Grid container spacing={2}>
      {skills.map((skill, index) => (
        <Grid item xs={4} key={index}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {skill.icon}
            <Typography sx={{ marginLeft: 1 }}>{skill.label}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>
));

const ProfessionalExperience = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, marginTop: 2, boxShadow: 3 }}>
  <CardContent>
    <Typography variant="h5" sx={{ marginBottom: 2 }}>
      Professional Experience
    </Typography>
    {experiences.map((experience, index) => (
      <Grid container spacing={2} key={index}>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Work sx={{ marginRight: 1 }} />
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {experience.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {experience.company} | {experience.duration}
              </Typography>
            </div>
          </div>
          {experience.responsibilities.map((task, idx) => (
            <Typography key={idx} variant="body2" sx={{ marginLeft: 3 }}>
              <Check/> {task}
            </Typography>
          ))}
        </Grid>
      </Grid>
    ))}
  </CardContent>
</Card>
));

const Certifications = React.forwardRef<HTMLDivElement>((props, ref) => (
<Card ref={ref} sx={{ padding: 1, marginTop: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Certifications</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <Typography>Salesforce for Beginners</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <Typography>Introduction to Cryptography</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <Typography>Foundations of R Software (Swayam)</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <Typography>Full Stack Developer Course</Typography>
        </ListItem>
      </List>
    </CardContent>
  </Card>
  ));

const AdditionalSkills = React.forwardRef<HTMLDivElement>((props, ref) => (
  <Card ref={ref} sx={{ padding: 2, backgroundColor: '#e3f2fd', marginTop: 2, boxShadow: 3 }}>
  <CardContent>
    <Typography variant="h5">Additional Skills</Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <ElectricBoltIcon color="primary" />
        </ListItemIcon>
        <Typography variant="body1">Strong analytical and problem-solving skills</Typography>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <SignLanguageIcon color="primary" />
        </ListItemIcon>
        <Typography variant="body1">Excellent communication and collaboration abilities</Typography>
      </ListItem>
    </List>
  </CardContent>
</Card>
));


const Footer = () => (
  <Box
    sx={{
      backgroundColor: '#1976d2',
      color: 'white',
      padding: 3,
      position: 'relative',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      marginTop: 'auto',
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
      display:"flex",
      justifyContent:"space-evenly"
    }}
  >
    <Typography variant="h6" sx={{ marginBottom: 1 }}>
      Contact Information:
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 1 }}>
      <EmailIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">vasanthvinv@example.com</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 1 }}>
      <PhoneIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">+91 9790515874</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <HomeIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">125/4, Chandrapuram, Tirupur - 641604</Typography>
    </Box>
    <Typography variant="body2" sx={{ marginTop: 2 }}>
      &copy; {new Date().getFullYear()} Vasanth V I. All rights reserved.
    </Typography>
  </Box>
);

const App: React.FC = () => {
  const objectiveRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const additionalSkillsRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - APP_BAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
            Vasanth V I
          </Typography>
          <Button onClick={() => scrollToSection(initRef)} color="inherit">Initialization</Button>
          <Button onClick={() => scrollToSection(objectiveRef)} color="inherit">Objective</Button>
          <Button onClick={() => scrollToSection(educationRef)} color="inherit">Education</Button>
          <Button onClick={() => scrollToSection(skillsRef)} color="inherit">Technical Skills</Button>
          <Button onClick={() => scrollToSection(experienceRef)} color="inherit">Experience</Button>
          <Button onClick={() => scrollToSection(projectsRef)} color="inherit">Projects</Button>
          <Button onClick={() => scrollToSection(certificationsRef)} color="inherit">Certifications</Button>
          <Button onClick={() => scrollToSection(additionalSkillsRef)} color="inherit">Additional Skills</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: `${APP_BAR_HEIGHT}px` }}>
        <Init ref={initRef} />
        <Objective ref={objectiveRef} />
        <Education ref={educationRef} />
        <TechnicalSkills ref={skillsRef} />
        <ProfessionalExperience ref={experienceRef} />
        <Projects ref={projectsRef} />
        <Certifications ref={certificationsRef} />
        <AdditionalSkills ref={additionalSkillsRef} />
      </Container>

      <Footer />
    </div>
  );
};

export default App;
