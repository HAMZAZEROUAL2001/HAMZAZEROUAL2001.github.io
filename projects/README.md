# Project Pages Guide

## Structure

Each project can have its own dedicated page with detailed explanations, code samples, and technical information.

## Directory Structure

```
projects/
├── template.html                    # Template for new project pages
├── project-mapping.json             # Maps repos to their detail pages
├── windows-defender-bypass.html     # Example: Windows Defender Bypass
├── anti-vm-technique.html           # Example: Anti-VM Detection
└── [your-project-name].html         # Add more projects here
```

## How to Add a New Project Page

### Step 1: Create the HTML Page

1. Copy `template.html` to create a new page
2. Rename it to match your project (e.g., `ransomware-analysis.html`)
3. Edit the content:
   - Update the `<title>` tag
   - Change the header gradient color
   - Fill in project name and description
   - Add your project details in each section

### Step 2: Update the JavaScript Mapping

Edit `js/scripts.js` and find the `projectPages` object (around line 170):

```javascript
const projectPages = {
    'WindowsDefenderBypasseTechnqueFirstBlog': 'windows-defender-bypass.html',
    'anti-VM-technique': 'anti-vm-technique.html',
    'YourRepoName': 'your-project-page.html'  // Add your project here
};
```

**Important:** The key must match EXACTLY your GitHub repository name!

### Step 3: Customize the Page

Use the template sections:

- **Project Overview:** What the project does and why
- **Technologies Used:** Languages, frameworks, tools
- **Key Features:** Main functionalities
- **Technical Implementation:** Architecture, code examples
- **Challenges & Solutions:** Problems faced and how you solved them
- **Results & Impact:** Achievements and outcomes
- **Learning Outcomes:** What you learned

### Step 4: Update Links

Make sure to update:
- GitHub repository URL at the bottom
- Back button link (should go to `../index.html#projects`)
- All relative paths for CSS/JS files use `../`

## Template Sections Explained

### Header Section
```html
<div class="project-header">
    <!-- Change the gradient colors here -->
    <style>
    .project-header {
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    }
    </style>
</div>
```

**Color Suggestions by Category:**
- **Cybersecurity:** Red gradient (`#e74c3c` to `#c0392b`)
- **Development:** Blue gradient (`#3498db` to `#2980b9`)
- **DEV JAM:** Purple gradient (`#9b59b6` to `#8e44ad`)

### Code Blocks
Use `<pre><code>` tags for code samples:
```html
<pre><code>// Your code here
function example() {
    return true;
}
</code></pre>
```

### Icons Available
Font Awesome icons you can use:
- `fa-shield` - Security
- `fa-code` - Development
- `fa-gamepad` - Gaming/Hackathon
- `fa-wrench` - Tools
- `fa-cogs` - Technical
- `fa-trophy` - Results
- `fa-graduation-cap` - Learning

## Current Project Pages

1. ✅ **Windows Defender Bypass** (`windows-defender-bypass.html`)
   - Repo: `WindowsDefenderBypasseTechnqueFirstBlog`
   - Category: Cybersecurity

2. ✅ **Anti-VM Technique** (`anti-vm-technique.html`)
   - Repo: `anti-VM-technique`
   - Category: Malware Analysis

## Projects Needing Pages

Create pages for these repos next:
- `Simple-Ransomware-Example`
- `AntiDBG-techniques`
- `windows-internals-cours-and-exercice`
- `voting-dapp-platform`
- `DEVJAM_code_crackers`

## Tips

1. **Keep it Professional:** Use clear language and proper formatting
2. **Add Code Examples:** Show your technical skills with code snippets
3. **Include Visuals:** Add screenshots if available (place in `/images/projects/`)
4. **SEO Friendly:** Use descriptive titles and meta tags
5. **Test Links:** Make sure all links work correctly

## Testing

After creating a new page:
1. Open `http://localhost:8000` in your browser
2. Navigate to Projects section
3. Click "View Details" button
4. Verify all content displays correctly
5. Test the "Back to Portfolio" button
6. Check on mobile devices

## Questions?

If you need help creating a project page, refer to the existing examples:
- `windows-defender-bypass.html` - Full technical project
- `anti-vm-technique.html` - Detection/Analysis project
- `template.html` - Basic structure
