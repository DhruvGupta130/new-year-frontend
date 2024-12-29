import axios from "axios";
import {api} from "./api.js";

export const resolutionsData = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        location: 'Delhi, India',
        imageUrl: 'https://th.bing.com/th/id/OIP.4vybQ7QQOAjn3acZFakFsAHaEu?rs=1&pid=ImgDetMain',
        title: 'Embrace Positivity',
        description: 'A resolution to focus on positivity and gratitude in the New Year.',
        buttonText: 'Learn More',
        info: 'Start the year by embracing a positive mindset and practicing gratitude daily. This resolution encourages letting go of negativity, finding joy in small moments, and focusing on personal growth.',
        timeFrame: 'Daily',
        effortsAndSacrifices: 'Commit to journaling daily, avoid negative influences, and consciously shift your perspective during challenging situations.'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        imageUrl: 'https://th.bing.com/th/id/OIP.vpcYp4re8YE5XwJzP6IXlAHaFj?rs=1&pid=ImgDetMain',
        title: 'Improve Spiritual Connection',
        description: 'A resolution to strengthen spiritual practices and inner peace.',
        buttonText: 'Explore',
        info: 'Dedicate time to strengthen your spiritual connection through prayer, meditation, or other practices. Reflect on life’s purpose and find clarity.',
        category: 'Spiritual Growth',
        benefits: 'Inner peace, clarity, improved focus.',
        timeFrame: 'Weekly',
        effortsAndSacrifices: 'Allocate time for quiet reflection or spiritual activities, reduce screen time, and resist distractions that interfere with inner peace.'
    },
    {
        id: 3,
        name: 'Amit Verma',
        location: 'Bangalore, India',
        imageUrl: 'https://example.com/new-year-party-india.jpg',
        title: 'Enhance Social Life',
        description: 'Make meaningful connections and cherish existing relationships.',
        buttonText: 'Discover',
        info: 'This resolution encourages you to focus on building and nurturing relationships. Attend social gatherings, reconnect with old friends, and participate in community events.',
        category: 'Social Well-being',
        benefits: 'Better relationships, reduced loneliness, increased happiness.',
        timeFrame: 'Monthly',
        effortsAndSacrifices: 'Step out of your comfort zone, dedicate time to social activities, and reduce solo screen time to foster real connections.'
    },
    {
        id: 4,
        name: 'Sunita Rao',
        location: 'Hyderabad, India',
        imageUrl: 'https://example.com/new-year-family-gathering-india.jpg',
        title: 'Prioritize Family Time',
        description: 'Spend quality time with family and strengthen bonds.',
        buttonText: 'View More',
        info: 'Make a conscious effort to spend more time with your family. Plan weekly family dinners, game nights, or outings to create lasting memories.',
        category: 'Family',
        benefits: 'Stronger bonds, emotional support, cherished memories.',
        timeFrame: 'Weekly',
        effortsAndSacrifices: 'Adjust personal schedules, reduce overtime work, and forgo some solo leisure activities to prioritize family time.'
    },
    {
        id: 5,
        name: 'Rahul Gupta',
        location: 'Chennai, India',
        imageUrl: 'https://example.com/new-year-south-india.jpg',
        title: 'Adopt a Healthier Lifestyle',
        description: 'Focus on eating healthy, staying active, and practicing self-care.',
        buttonText: 'Explore',
        info: 'Incorporate balanced meals, regular exercise, and self-care routines into your daily life.',
        category: 'Health & Wellness',
        benefits: 'Increased energy, improved fitness, better mental health.',
        timeFrame: 'Daily',
        effortsAndSacrifices: 'Wake up earlier for exercise, plan and prepare healthy meals, and limit indulgent foods and sedentary habits.'
    },
    {
        id: 6,
        name: 'Anjali Patel',
        location: 'Pune, India',
        imageUrl: 'https://example.com/new-year-lights-india.jpg',
        title: 'Declutter and Organize',
        description: 'Bring order to your life by decluttering your space and mind.',
        buttonText: 'Discover',
        info: 'Take steps to declutter your home, workspace, and mind. Organizing your surroundings can bring clarity and reduce stress.',
        category: 'Productivity',
        benefits: 'Reduced stress, improved focus, a sense of control.',
        timeFrame: 'Monthly',
        effortsAndSacrifices: 'Dedicate weekends to decluttering, avoid impulse purchases, and resist hoarding unused items.'
    },
    {
        id: 7,
        name: 'Kavita Singh',
        location: 'Ahmedabad, India',
        imageUrl: 'https://example.com/new-year-in-temple-india.jpg',
        title: 'Give Back to the Community',
        description: 'Make a difference by volunteering or supporting a cause.',
        buttonText: 'View More',
        info: 'Contribute to the community through volunteering, donating, or helping those in need.',
        category: 'Community Service',
        benefits: 'Sense of purpose, societal impact, personal fulfillment.',
        timeFrame: 'Monthly',
        effortsAndSacrifices: 'Dedicate weekends or free time to community service, adjust personal budgets to accommodate donations, and forgo some leisure activities.'
    },
    {
        id: 8,
        name: 'Vikram Mehta',
        location: 'Kolkata, India',
        imageUrl: 'https://example.com/new-year-ram-navami-india.jpg',
        title: 'Learn Something New',
        description: 'Expand your horizons by picking up a new skill or hobby.',
        buttonText: 'Explore',
        info: 'Commit to learning a new skill, language, or hobby. Engaging in new activities can boost creativity and confidence.',
        category: 'Personal Development',
        benefits: 'Increased confidence, skill development, creative expression.',
        timeFrame: 'Weekly',
        effortsAndSacrifices: 'Invest time regularly in learning, overcome initial frustration, and reduce time spent on non-productive entertainment.'
    }
];
export const data = async () => {
    try {
        const response = await axios.get(`${api}/get`);
        console.log(response.data);
        return response.data;
    }  catch (error) {
        console.error("There was an error fetching the resolutions:", error);
        return [];
    }
}

