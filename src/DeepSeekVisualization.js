import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, HelpCircle, X } from 'lucide-react';

// Helper Panel Component
const InfoPanel = ({ isOpen, setIsOpen }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      )}
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">DeepSeek's Distillation Approach</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <section>
              <h4 className="font-semibold text-lg mb-2">What is Model Distillation?</h4>
              <p className="text-sm text-gray-700">
                Model distillation is the process of transferring knowledge from a large, resource-intensive model (the "teacher") to a smaller, more efficient model (the "student").
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">DeepSeek's Innovation</h4>
              <p className="text-sm text-gray-700">
                Traditional distillation transfers only final outputs. DeepSeek's approach transfers the entire reasoning process, preserving the step-by-step chain of thought that makes these models powerful.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">The Technical Process</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>Train the large 671B model to reason step-by-step</li>
                <li>Generate thousands of reasoning examples showing full problem-solving</li>
                <li>Use these examples as training data for smaller models</li>
                <li>Train multiple size variants (70B, 7B, 1.5B) to reproduce the same reasoning</li>
                <li>Optimize the small models to maintain reasoning quality</li>
              </ol>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Real-World Impact</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Accessibility:</span> Advanced AI that runs on consumer hardware
                </li>
                <li>
                  <span className="font-medium">Cost Reduction:</span> 96% cheaper API costs compared to similar models
                </li>
                <li>
                  <span className="font-medium">Efficiency:</span> 99% fewer parameters while maintaining capabilities
                </li>
                <li>
                  <span className="font-medium">Democratization:</span> Makes advanced AI accessible beyond big tech
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
const DeepSeekVisualization = () => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3000);
  const [showInfo, setShowInfo] = useState(true);
  const [modelAnswer, setModelAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [rewardValue, setRewardValue] = useState(0);
  const [distillIndex, setDistillIndex] = useState(0);
  const [distilledSize, setDistilledSize] = useState(1);

  // Learning examples
  const learningExamples = [
    {
      step: "Introduction: Reasoning with Verifiable Problems",
      problem: "This demonstration uses mathematical problems with known answers to show how DeepSeek trains and distills reasoning capabilities.",
      modelThinking: "Throughout this visualization, you'll see how models approach problems with verifiable solutions. This allows us to measure the reasoning accuracy and provide appropriate feedback during training and fine-tuning.",
      correctAnswer: null,
      reward: null,
      description: "DeepSeek's approach uses problems with known answers, like math equations, as the foundation for teaching models how to reason. This gives the advantage of being able to automatically verify solutions and provide clear feedback to the model.",
    },
    {
      step: "Phase 1: Training Large Model",
      problem: "If John has 5 apples and gives 2 to Mary, how many apples does John have left?",
      modelThinking: "Let me solve this step by step:\n1. John starts with 5 apples\n2. John gives 2 apples to Mary\n3. So John has 5 - 2 = 3 apples left",
      correctAnswer: 3,
      reward: 1,
      description: "DeepSeek first trains their large 671B parameter model using reinforcement learning. The model learns to solve problems by breaking down reasoning into step-by-step chains of thought.",
    },
    {
      step: "Large Model Reasoning Development",
      problem: "Find the value of x in the equation 3x + 7 = 22.",
      modelThinking: "I'll solve for x:\n1. First, I need to isolate the term with x\n2. Subtract 7 from both sides: 3x + 7 - 7 = 22 - 7\n3. This gives me: 3x = 15\n4. Now divide both sides by 3: 3x/3 = 15/3\n5. Therefore, x = 5\n\nLet me verify: If x = 5, then 3x + 7 = 3(5) + 7 = 15 + 7 = 22. Yes, this checks out!",
      correctAnswer: 5,
      reward: 1,
      description: "Through reinforcement learning, the large model becomes proficient at complex reasoning. It learns to verify answers and develop structured thinking patterns that will later be transferred to smaller models.",
    },
    {
      step: "Generating Distillation Data",
      problem: "If a rectangle has a length of 8 cm and a width of 6 cm, what is the area and perimeter?",
      modelThinking: "Let me work through this:\n1. Area of rectangle = length × width\n2. Area = 8 cm × 6 cm = 48 cm²\n3. Perimeter of rectangle = 2 × (length + width)\n4. Perimeter = 2 × (8 cm + 6 cm) = 2 × 14 cm = 28 cm\nSo the area is 48 cm² and the perimeter is 28 cm.",
      correctAnswer: "48 cm², 28 cm",
      reward: 1,
      description: "Once fully trained, the large model generates thousands of reasoning examples on diverse problems. These examples capture the model's reasoning process, not just the final answers.",
    },
    {
      step: "Phase 2: Fine-Tuning Preparation",
      problem: "DeepSeek prepares to transfer knowledge to smaller models through fine-tuning.",
      modelThinking: "Unlike regular training from scratch, fine-tuning starts with a pre-trained model and adapts it for a specific purpose. In this case, teaching smaller models to reason like the large model.",
      correctAnswer: null,
      reward: null,
      description: "Fine-tuning is the process of taking a pre-trained model and adapting it to perform specific tasks by continuing training on specialized data. In DeepSeek's distillation, fine-tuning is used to transfer reasoning abilities to smaller models.",
    },
    {
      step: "Fine-Tuning Small Models (Part 1)",
      problem: "The fine-tuning process begins with teacher-student training.",
      modelThinking: "The large 671B 'teacher' model generates reasoning chains, and smaller 'student' models (starting with 70B) are fine-tuned to reproduce the same reasoning patterns and outputs.",
      correctAnswer: null,
      reward: null,
      description: "During fine-tuning, the smaller model starts with general language understanding from pre-training, then adjusts its parameters specifically to match the reasoning patterns of the large model. This is more efficient than training from scratch.",
    },
    {
      step: "Fine-Tuning Small Models (Part 2)",
      problem: "Loss functions are specially designed for effective knowledge transfer.",
      modelThinking: "The fine-tuning process uses specialized loss functions that focus on matching the reasoning chains, not just final answers. These loss functions measure how closely the small model's thinking matches the large model's step-by-step approach.\n\nA loss function is like a 'wrongness score' - it measures how far off the student model is from the teacher model's reasoning. The student model's goal is to minimize this score by adjusting its understanding until its reasoning closely matches the teacher's.",
      correctAnswer: null,
      reward: null,
      description: "DeepSeek uses specialized fine-tuning techniques that prioritize the transfer of reasoning patterns. The smaller models are trained to minimize the difference between their outputs and the large model's outputs at each step of the reasoning process. This approach ensures that the smaller models don't just memorize answers but learn the actual reasoning strategies.",
    },
    {
      step: "Progressive Fine-Tuning",
      problem: "Smaller models are fine-tuned in a cascading fashion.",
      modelThinking: "After fine-tuning the 70B model, its outputs can be used to fine-tune even smaller models (7B, then 1.5B), creating a pipeline of knowledge distillation.",
      correctAnswer: null,
      reward: null,
      description: "DeepSeek uses a progressive approach where each fine-tuned model can become a teacher for even smaller models. This creates a distillation pipeline that efficiently transfers knowledge while managing computational requirements.",
    },
    {
      step: "Testing Fine-Tuned Models",
      problem: "If the price of a shirt decreased by 30% to $35, what was the original price?",
      modelThinking: "I need to find the original price before the 30% discount:\n1. Let's call the original price p\n2. After a 30% discount, the price is $35\n3. This means: p × (1 - 0.3) = $35\n4. p × 0.7 = $35\n5. p = $35 ÷ 0.7 = $50\n\nSo the original price was $50.",
      correctAnswer: 50,
      reward: 1,
      description: "The fine-tuned smaller model demonstrates reasoning capabilities similar to the large model. This 7B parameter model (which is 99% smaller than the original 671B model) shows it can solve complex problems using the same step-by-step approach it learned from the teacher model. This proves the effectiveness of DeepSeek's distillation approach.",
    }
  ];

  // Distilled model sizes (for visualization)
  const distilledSizes = [
    { name: "DeepSeek-R1", size: "671B", color: "bg-blue-500", width: "w-full" },
    { name: "Distilled-70B", size: "70B", color: "bg-green-500", width: "w-4/5" },
    { name: "Distilled-7B", size: "7B", color: "bg-yellow-500", width: "w-3/5" },
    { name: "Distilled-1.5B", size: "1.5B", color: "bg-red-500", width: "w-2/5" }
  ];

  // Effect for auto-play
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= learningExamples.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  // Effect to handle model answer typing animation with fixes for the final example
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setModelAnswer("");
    setShowSolution(false);
    setRewardValue(0);
    
    if (currentStep >= 6) {  // Updated from 5 to 6 for the new intro example
      // During distillation steps
      setDistillIndex(currentStep - 6);  // Updated from 5 to 6
      if (currentStep === 8) {  // Updated from 7 to 8
        setDistilledSize(3);
      }
    } else {
      setDistillIndex(0);
    }

    const currentExample = learningExamples[currentStep];
    
    // Special handling for the final example to ensure it completes
    if (currentStep === learningExamples.length - 1) {
      // For the last example, set the full text immediately
      setTimeout(() => {
        setModelAnswer(currentExample.modelThinking);
        
        // Then show solution after a delay
        setTimeout(() => {
          setShowSolution(true);
          if (currentExample.reward !== null) {
            setTimeout(() => {
              setRewardValue(currentExample.reward);
            }, 800);
          }
        }, 1000);
      }, 100);
      
      return;
    }
    
    // Normal animation for other examples
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < currentExample.modelThinking.length) {
        setModelAnswer(prev => prev + currentExample.modelThinking.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        
        // After typing completes, show solution after a delay
        const solutionTimer = setTimeout(() => {
          setShowSolution(true);
          if (currentExample.reward !== null) {
            const rewardTimer = setTimeout(() => {
              setRewardValue(currentExample.reward);
            }, 800);
            return () => clearTimeout(rewardTimer);
          }
        }, 1000);
        
        return () => clearTimeout(solutionTimer);
      }
    }, 20);
    
    return () => clearInterval(typingInterval);
  }, [currentStep]);

  // Navigation functions
  const nextStep = () => {
    if (currentStep < learningExamples.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setModelAnswer("");
    setShowSolution(false);
    setRewardValue(0);
    setDistillIndex(0);
    setDistilledSize(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pb-8">
      <InfoPanel isOpen={showInfo} setIsOpen={setShowInfo} />
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">DeepSeek's Model Distillation</h1>
        <p className="text-gray-600">
          Visualizing how DeepSeek transfers reasoning abilities from large models to small, efficient ones
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6 bg-gray-200 h-2 rounded-full">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / learningExamples.length) * 100}%` }}
        />
      </div>
      
      {/* Current stage */}
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            {learningExamples[currentStep].step}
          </h2>
          <p className="text-gray-700 mb-4">
            {learningExamples[currentStep].description}
          </p>
        </div>
      </div>
      
      {/* Main visualization area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Problem and Model */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="font-semibold text-lg">Problem</h3>
          </div>
          <div className="p-5">
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              {learningExamples[currentStep].problem}
            </div>
            
            {currentStep < 6 && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                    AI
                  </div>
                  <h4 className="font-medium">DeepSeek R1 Model Thinking:</h4>
                </div>
                <div className="pl-14 pr-4 py-3 bg-gray-50 rounded-lg whitespace-pre-line font-mono text-sm">
                  {modelAnswer}
                </div>
              </div>
            )}
            
            {currentStep >= 6 && currentStep < 8 && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                    AI
                  </div>
                  <h4 className="font-medium">Large Model (671B parameters)</h4>
                </div>
                <div className="pl-14 pr-4 py-3 bg-gray-50 rounded-lg whitespace-pre-line font-mono text-sm">
                  {modelAnswer}
                </div>
              </div>
            )}
            
            {currentStep === 8 && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mr-3">
                    AI
                  </div>
                  <h4 className="font-medium">Distilled Model (7B parameters)</h4>
                </div>
                <div className="pl-14 pr-4 py-3 bg-gray-50 rounded-lg whitespace-pre-line font-mono text-sm">
                  {modelAnswer}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Feedback and Learning */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {currentStep < 6 ? (
            <>
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold text-lg">Reinforcement Learning Process</h3>
              </div>
              <div className="p-5">
                {showSolution && learningExamples[currentStep].correctAnswer !== null && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Correct Answer:</h4>
                      <span className="text-green-600 font-semibold">
                        {learningExamples[currentStep].correctAnswer}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Model Performance:</h4>
                      <span className={`font-semibold ${rewardValue === 1 ? 'text-green-600' : rewardValue > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {rewardValue === 1 ? 'Correct' : rewardValue > 0 ? 'Partially Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Reward Signal:</h4>
                      <div className="bg-gray-200 h-6 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${
                            rewardValue === 1 ? 'bg-green-500' : 
                            rewardValue > 0.5 ? 'bg-yellow-500' : 
                            rewardValue > 0 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${rewardValue * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">How DeepSeek's Training Works:</h4>
                  <ol className="space-y-3 text-sm text-gray-700 pl-5 list-decimal">
                    <li>The large model is trained with reinforcement learning</li>
                    <li>It learns to produce step-by-step reasoning (Chain of Thought)</li>
                    <li>The model becomes proficient at complex problem-solving</li>
                    <li>This creates a foundation for the distillation process</li>
                    <li>The goal: high-quality reasoning that can be transferred to smaller models</li>
                  </ol>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50 p-4 border-b">
                <h3 className="font-semibold text-lg">Model Distillation Process</h3>
              </div>
              <div className="p-5">
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Original Model:</h4>
                  <div className="flex items-center">
                    <span className="w-24 text-sm font-mono">671B params</span>
                    <div className="flex-1 h-8 bg-blue-200 rounded relative overflow-hidden">
                      <div className="h-full bg-blue-500 rounded absolute inset-0"></div>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm shadow-sm">DeepSeek-R1</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Distilled Models:</h4>
                  <div className="space-y-3">
                    {distilledSizes.slice(1, 1 + distilledSize).map((model, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-24 text-sm font-mono">{model.size} params</span>
                        <div className="flex-1 h-8 bg-gray-200 rounded relative overflow-hidden">
                          <div className={`h-full ${model.color} rounded absolute inset-0 ${model.width}`}></div>
                          <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm shadow-sm">{model.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">DeepSeek's Fine-Tuning Process:</h4>
                  <ol className="space-y-3 text-sm text-gray-700 pl-5 list-decimal">
                    <li>Start with pre-trained smaller models that already understand language</li>
                    <li>Create a specialized dataset from the large model's reasoning chains</li>
                    <li>Adjust the smaller model's parameters to match the reasoning patterns</li>
                    <li>Use specialized loss functions that prioritize preserving chain-of-thought reasoning</li>
                    <li>Apply progressive fine-tuning to create smaller and smaller models</li>
                    <li>Verify that fine-tuned models maintain the step-by-step reasoning ability</li>
                    <li>The result: small models that reason like much larger ones</li>
                  </ol>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={nextStep}
          disabled={isPlaying || currentStep === learningExamples.length - 1}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next Step <ArrowRight className="ml-2 w-4 h-4" />
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={currentStep === learningExamples.length - 1}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isPlaying ? (
            <><Pause className="mr-2 w-4 h-4" /> Pause</>
          ) : (
            <><Play className="mr-2 w-4 h-4" /> Auto Play</>
          )}
        </button>
        
        <button
          onClick={resetDemo}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          <RotateCcw className="mr-2 w-4 h-4" /> Start Over
        </button>
        
        <div className="flex items-center">
          <input
            type="range"
            min="1000"
            max="5000"
            step="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm ml-2">{speed/1000}s</span>
        </div>
      </div>
      
      {/* Key insights */}
      <div className="mt-10 bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Fine-Tuning vs. Traditional Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2">What is Fine-Tuning?</h4>
            <p className="text-sm text-gray-700">
              Fine-tuning is taking a pre-trained model and adapting it for specific tasks by continuing its training on specialized data. It's like teaching new skills to someone who already has a solid foundation of knowledge.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2">Benefits in Distillation</h4>
            <p className="text-sm text-gray-700">
              DeepSeek's fine-tuning approach allows smaller models to inherit reasoning abilities from the large model without starting from scratch. This is far more efficient than training small models directly and achieves better results.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-medium text-blue-700 mb-2">Technical Approach</h4>
            <p className="text-sm text-gray-700">
              DeepSeek uses specialized teacher-student fine-tuning where the large model (teacher) generates reasoning examples, and smaller models (students) are fine-tuned to match these patterns, preserving the entire reasoning process.
            </p>
          </div>
        </div>
      </div>
      
      {/* Additional information panel */}
      <div className="mt-6 bg-blue-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">DeepSeek's Fine-Tuning Pipeline</h3>
        <div className="space-y-4">
          <div className="flex">
            <div className="w-1/3 font-medium pr-4">1. Pre-Trained Foundation</div>
            <div className="w-2/3 text-sm text-gray-700">
              Start with smaller pre-trained models that already understand language fundamentals but haven't learned complex reasoning.
            </div>
          </div>
          
          <div className="flex">
            <div className="w-1/3 font-medium pr-4">2. Reasoning Dataset Creation</div>
            <div className="w-2/3 text-sm text-gray-700">
              The large model generates thousands of step-by-step reasoning examples solving various problems, creating a specialized fine-tuning dataset.
            </div>
          </div>
          
          <div className="flex">
            <div className="w-1/3 font-medium pr-4">3. Learning Objective Design</div>
            <div className="w-2/3 text-sm text-gray-700">
              Fine-tuning uses specialized loss functions that reward the smaller model not just for correct answers but for matching the entire reasoning process of the large model.
            </div>
          </div>
          
          <div className="flex">
            <div className="w-1/3 font-medium pr-4">4. Progressive Knowledge Transfer</div>
            <div className="w-2/3 text-sm text-gray-700">
              A cascade of fine-tuning occurs: 671B → 70B → 7B → 1.5B, where each smaller model can learn from the previously fine-tuned model rather than always using the largest one.
            </div>
          </div>
          
          <div className="flex">
            <div className="w-1/3 font-medium pr-4">5. Evaluation and Refinement</div>
            <div className="w-2/3 text-sm text-gray-700">
              Each fine-tuned model is tested for reasoning quality, with additional fine-tuning rounds applied if needed to ensure they maintain the reasoning capabilities of the large model.
            </div>
          </div>
        </div>
      </div>
    </div>
      );
    };
    
    export default DeepSeekVisualization;