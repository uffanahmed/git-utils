import { exec } from 'child_process';
import { createObjectCsvWriter } from 'csv-writer';
import { promisify } from 'util';
import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

interface Commit {
  hash: string;
  author_name: string;
  date: string;
  message: string;
}

// Utility to run command and return stdout
const runCommand = async (cmd: string, options: any = {}) => {
    const { stdout } = await execPromise(cmd, options);
    return stdout.toString().trim(); // Convert Buffer to string
};

// Generate CSV
const writeCsv = async (commits: Commit[], directory: string) => {
  const csvWriter = createObjectCsvWriter({
    path: path.join(directory, 'commits.csv'),
    header: [
      { id: 'hash', title: 'Commit Hash' },
      { id: 'author_name', title: 'Author' },
      { id: 'date', title: 'Date' },
      { id: 'message', title: 'Title' },
    ]
  });

  await csvWriter.writeRecords(commits);
  console.log('CSV file generated successfully.');
};

// Fetch commits using simple-git
const fetchCommits = async (repoDir: string, branch: string, startDate: string): Promise<Commit[]> => {
    const git = simpleGit(repoDir);

    try {
      await git.checkout(branch);
      const logs = await git.log({
        '--since': startDate // Use '--since' correctly here
      });

      return logs.all.map(log => ({
        hash: log.hash,
        author_name: log.author_name,
        date: log.date,
        message: log.message
      }));
    } catch (err) {
      console.error('Error fetching commits:', err);
      throw err;
    }
};

// Command line argument parsing
const [repoDir, branchName, startDate] = process.argv.slice(2);

if (!repoDir || !branchName || !startDate) {
  console.log('Usage: ts-node src/index.ts <repository-local-path> <branch> <start-date>');
  process.exit(1);
}

(async () => {
  // Validate directory exists
  if (!fs.existsSync(repoDir)) {
    console.error('Repository directory does not exist.');
    process.exit(1);
  }

  try {
    const commits = await fetchCommits(repoDir, branchName, startDate);
    await writeCsv(commits, repoDir);
  } catch (error) {
    console.error('Failed to generate commits CSV:', error);
  }
})();
