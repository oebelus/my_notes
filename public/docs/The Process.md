#### Introduction

A process, informally, is *a running program*. A program is just some code and instructions on the disk. It's the operating system that takes these bytes and gets them running into a *process*.

>A process is an instance of a computer program in execution.

When you run many concurrent processes, the OS creates the illusion of having too many CPUs by virtualizing the only or the few CPUs: Running one process, then stopping it and running another, and so forth... etc.

This technique is called *time sharing* of the CPU, at the cost of performance of course since each program will run more slowly if the CPU(s) is shared.

The OS uses two things to implement *time sharing*:

- Low-level mechanisms: methods or protocols that implement a functionality.
 	- ***Example:*** the *context switch* gives the OS the ability to stop running one program and start running another one on a given CPU.
- High-level intelligence, called *policies*: algorithms for making some kind of decision within the OS.
 	- ***Example:*** the *scheduling policy*, it decides which program should the OS run, given a possible programs to run on a CPU. It takes into consideration many things such as historical information, workload knowledge and performance metrics.

>Low-Level mechanisms answer *how* questions like: < How does an operating system perform a context switch? >, and the High-Level mechanisms answer *which* questions such as: < which process should the operating system run right now? >

>Low-Level mechanisms and High-Level policies tend to be separated in many operating systems for modularity purposes.
>
#### What constitutes a process?

A process is described by its states. That's why, to understand what constitutes a process, we have to understand what is a state machine.

A state machine is a computational model used to design and describe systems that can be in one of a finite number of states at any given time. The transition between states are based on specific input or events, following transition rules.

The components of a state machine are:

- *Memory*: it's where the instructions and the data that the process reads and writes lie.
- *Registers*: many instructions read or update registers. There are special registers that are:
 	- The program counter: points to the current instruction and tells which instruction is to be executed next.
 	- The stack pointer and the frame pointer: manage the stack for function parameters, local variables, and return addresses.
 	- etc.
- *Persistent Storage devices:* e.g. open files which can be read or written.

#### The Process Memory

The process memory is divided into four sections:

| Section | Description                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------- |
| Text    | The compiled program code, read in from non-volatile storage (disk) when the program is launched. |
| Data    | It stores global and static variables, allocated and initialized prior to executing main.         |
| Heap    | Used for dynamic memory allocation, and managed via calls to new, delete, malloc, free, etc.      |
| Stack   | Used for local variables.                                                                         |

>The stack and the heap start at opposite ends of the process's free space and grow towards each other. If they should ever meet, then either a stack overflow error will occur, or else a call to new or malloc will fail due to insufficient memory available.

<div align="center">
 <img src="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter3/3_01_Process_Memory.jpg" alt="A process in memory">
</div>

#### The Process API

The process API consists of calls programs can make related to processes. The APIs that must be included in any interface of an operating system are:

- Create: A method to create new processes;
  - Typing a command into the shell
  - Double-clicking on an application icon
- Destroy: A method to destroy processes forcefully.
  - An interface to kill a process in case they don't terminate normally after they are complete.
- Wait: A method to wait for a process to stop running.
- Miscellaneous Control: Other controls other than creating or destroying.
  - Suspending a process for a while then resuming it.
- Status: A method to get status information about a process.
  - How long it has run for;
  - What state it is in,
  - How much resources it consumes ...etc.

#### Process Creation

The question here is, how does an OS run a program?

1- Programs initially reside on disk (or flash-based SSDs) in some kind of executable format;

2- The OS loads the program's code and any static data (initialized variables) and reads the bytes into memory (the address space of the process).

>In early OS, the loading process is done eagerly (all at once before running the program); modern OSes perform the process lazily, by loading pieces of code or data only as they are needed during the program execution. To do so, the OS has to do something that we'll see later (paging, swapping ...etc.) before running anything.

3- Memory allocation for the program's run-time stack, the OS  will also likely initialize the stack with arguments, specifically, it will fill in the parameters to the `main()` function, i.e., `argc` and `argv`.

4- Memory allocation for the program's heap. It will be small at first; as the program runs, and requests more memory via `malloc()` library API, the OS might get involved and allocate more memory to the process.

5- Initialization tasks, related to I/O.

6- The OS then jumps to the `main()` routine through a specialized mechanism (we'll see later). and transfers control of the CPU to the newly-created process.

7- The program begins execution :3

<div>
 <img style="max-width: 100%; height: auto;" src="https://o.quizlet.com/KmoQLTBfwDUhLmO3Lknz8g.png" alt="loading from program to process">
</div>

#### Process States
When you run a program, which becomes a process, it goes through different phases, that depend on OS, before completion. The most common process lifecycle include two, five, or seven states.

The process can be one of five states:

- New: The process is in the stage of being created.
- Running: a process is running on a processor, the processor is executing instructions.
- Ready: a process is ready to run, but for some reason, the OS has chosen to not run it at this moment.
- Blocked (Waiting): the process cannot be run at the moment, because it's waiting for some resource to be available or for some event to occur.
- Terminated: The process has completed.

>The final state can be useful as it allows other processes (usually the parent that created the process) to examine the return code of the process and see if the just-finished process executed successfully - In UNIX-based systems, zero means success, non-zero otherwise.
>
>When finished, the parent will make one final call (e.g., wait()) to wait for the completion of the child, and to also indicate to the OS that it can clean up any relevant data structures that referred to the now-extinct process.

<div>
 <img style="max-width: 100%; height: auto;" src="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter3/3_02_ProcessState.jpg">
</div>
A process can be moved between the ready and running states:
- Being moved from ready to running means the process has been scheduled;
- Being moved from running to ready means the process has been descheduled.

#### Process Control Block

The OS is a program that has some key data structures that track relevant pieces of information. So the PCB (Process Control block) is a data structure maintained by the OS  for every process, and it keeps all the information needed to keep track of a process:

| Name                          | Description                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| Process State                 | The current [[#Process State\|state]] of the process.                                  |
| Process Privileges            | To allow/disallow access to system resources.                                          |
| Process ID                    | Unique identification of the process.                                                  |
| Pointer                       | A pointer to parent process.                                                           |
| Program Counter               | A pointer to the address of the next instruction to be executed.                       |
| CPU registers                 | Various CPU registers where process need to be stored for execution for running state. |
| CPU Scheduling Information    | Such as priority information and pointers to scheduling queues.                        |
| Memory Management Information | Page table, memory limits, segment table...                                            |
| Accounting Information        | The amount of CPU used for process execution, time limits, execution ID etc.           |
| IO status information         | A list of I/O devices allocated to the process, open file tables, etc.                 |

<div align="center">
 <img src="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter3/3_03_PCB.jpg" alt="PCB">
</div>
The CPU registers and program counter are needed to be saved and restored when swapping processes in and out of the CPU.

##### Example from the [xv6 kernel](https://github.com/mit-pdos/xv6-public)
This shows what type of information an OS needs to track about each process in the xv6 kernel. Similar process structures, yet complex, exist in “real” operating systems such as Linux, Mac OS X, or Windows.
1. The registers  xv6 will save and restore to stop and restart a process:
```C
struct context {
 int eip;
 int esp;
 int ebx;
 int ecx;
 int edx;
 int esi;
 int edi;
 int ebp;
}
```
2. The different states of a process:
```C
enum proc_state {
 UNUSED, EMBRYO, SLEEPING, RUNNABLE, RUNNING, ZOMBIE
};
```

>A zombie state, in UNIX-based systems, is a process in its final state that has not been cleaned yet.

3. The information xv6 tracks about each process:

```C
struct proc {
 char *mem;                  // Start of process memory
 uint sz;                    // Size of process memory
 char *kstack;               // Bottom of kernel stack for this process

 enum proc_state state;
 int pid; 
 struct proc *parent;
 void *chan;                 // If !zero, sleeping on chan
 int killed;                 // If !zero, has been killed
 struct file *ofile[NOFILE]; // Open files
 struct inode *cwd;
 struct context context;     // Switch here to run process
 struct trapframe *tf;       // Trap frame for the current interrupt
}
```

The register context will hold, for a stopped process, the contents of its register. When a process is stopped, its registers will be saved to this memory location; by restoring these registers (i.e., placing their values back into the actual physical registers), the OS can resume running the process - Context Switch.

#### Resources Used

- [The Abstraction: The Process (Operating Systems: Three Easy Pieces)](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf)- My Main Resource
- [Operating System - Process, Tutorial Points](https://www.tutorialspoint.com/operating_system/os_processes.htm)
- [Processes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/3_Processes.html) - A very good webpage
