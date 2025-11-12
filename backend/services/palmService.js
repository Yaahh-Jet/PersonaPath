import sharp from 'sharp';

// Palm line types and their meanings
const PALM_LINES = {
  'Heart Line': {
    meanings: {
      deep_long: 'Strong emotional connections, passionate nature',
      shallow_short: 'Reserved emotions, practical in relationships',
      curved_up: 'Expressive with feelings, idealistic in love',
      straight: 'Logical approach to emotions, stable relationships'
    }
  },
  'Head Line': {
    meanings: {
      deep_long: 'Analytical thinker, strategic mind',
      shallow_short: 'Quick thinker, spontaneous decisions',
      curved: 'Creative and imaginative',
      straight: 'Practical and realistic thinking'
    }
  },
  'Life Line': {
    meanings: {
      deep_long: 'Strong vitality, determined and balanced',
      shallow_short: 'Adaptable, flexible lifestyle',
      curved_wide: 'Energetic and enthusiastic',
      close_thumb: 'Cautious and reserved'
    }
  },
  'Fate Line': {
    meanings: {
      present: 'Strong sense of purpose and direction',
      absent: 'Flexible path, self-directed journey',
      deep: 'Controlled by external circumstances',
      broken: 'Changes in career or life direction'
    }
  }
};

// Validate if image is a palm
export async function validatePalmImage(imageBuffer) {
  try {
    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    
    // Basic validation
    if (metadata.width < 200 || metadata.height < 200) {
      return { valid: false, reason: 'Image resolution too low. Please upload a clearer image.' };
    }

    // Convert to grayscale and analyze
    const { data, info } = await sharp(imageBuffer)
      .resize(224, 224)
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Check for hand-like features (skin tone, lines, etc.)
    const pixels = new Uint8Array(data);
    let skinTonePixels = 0;
    let darkPixels = 0;
    let totalPixels = pixels.length;

    for (let i = 0; i < pixels.length; i++) {
      // Skin tone typically falls in 120-240 range in grayscale
      if (pixels[i] >= 120 && pixels[i] <= 240) {
        skinTonePixels++;
      }
      // Too dark (likely not a palm)
      if (pixels[i] < 50) {
        darkPixels++;
      }
    }

    const skinToneRatio = skinTonePixels / totalPixels;
    const darkRatio = darkPixels / totalPixels;

    // At least 40% should be skin tone for palm
    if (skinToneRatio < 0.4) {
      return { valid: false, reason: 'Image does not appear to be a palm. Please upload a clear photo of your palm.' };
    }

    // Not too dark
    if (darkRatio > 0.5) {
      return { valid: false, reason: 'Image is too dark. Please use better lighting.' };
    }

    return { valid: true };
  } catch (error) {
    console.error('Palm validation error:', error);
    return { valid: false, reason: 'Error processing image. Please try another photo.' };
  }
}

// Detect palm lines using edge detection
export async function detectPalmLines(imageBuffer) {
  try {
    // Preprocess image for line detection
    const processedImage = await sharp(imageBuffer)
      .resize(800, 800, { fit: 'inside' })
      .grayscale()
      .normalize()
      .sharpen()
      .toBuffer();

    // Apply edge detection (Sobel-like filter)
    const edgeImage = await sharp(processedImage)
      .convolve({
        width: 3,
        height: 3,
        kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1]
      })
      .toBuffer();

    // Analyze edge density in different regions
    const { data, info } = await sharp(edgeImage)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const regions = analyzeRegions(data, info.width, info.height);

    return regions;
  } catch (error) {
    console.error('Line detection error:', error);
    return null;
  }
}

// Analyze different regions of palm
function analyzeRegions(data, width, height) {
  const regions = {
    upper: { density: 0, area: 'emotional/heart' },
    middle: { density: 0, area: 'intellectual/head' },
    lower: { density: 0, area: 'vitality/life' },
    thumb_side: { density: 0, area: 'fate/career' }
  };

  const pixels = new Uint8Array(data);
  const regionHeight = Math.floor(height / 3);
  const regionWidth = Math.floor(width / 4);

  // Upper region (Heart line area)
  let upperDensity = 0;
  for (let y = 0; y < regionHeight; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      if (pixels[idx] > 128) upperDensity++;
    }
  }
  regions.upper.density = upperDensity / (regionHeight * width);

  // Middle region (Head line area)
  let middleDensity = 0;
  for (let y = regionHeight; y < regionHeight * 2; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      if (pixels[idx] > 128) middleDensity++;
    }
  }
  regions.middle.density = middleDensity / (regionHeight * width);

  // Lower region (Life line area)
  let lowerDensity = 0;
  for (let y = regionHeight * 2; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x);
      if (pixels[idx] > 128) lowerDensity++;
    }
  }
  regions.lower.density = lowerDensity / ((height - regionHeight * 2) * width);

  // Thumb side region (Fate line area)
  let thumbDensity = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < regionWidth; x++) {
      const idx = (y * width + x);
      if (pixels[idx] > 128) thumbDensity++;
    }
  }
  regions.thumb_side.density = thumbDensity / (height * regionWidth);

  return regions;
}

// Generate palmistry reading based on detected features
export function generatePalmReading(regions) {
  const reading = {
    lineType: '',
    prediction: '',
    detailedAnalysis: {},
    lines: [],
    timestamp: new Date()
  };

  // Determine dominant line based on density
  const densities = {
    heart: regions.upper.density,
    head: regions.middle.density,
    life: regions.lower.density,
    fate: regions.thumb_side.density
  };

  const dominantLine = Object.keys(densities).reduce((a, b) => 
    densities[a] > densities[b] ? a : b
  );

  // Heart Line Analysis
  if (dominantLine === 'heart') {
    reading.lineType = 'Heart Line Dominant';
    if (regions.upper.density > 0.15) {
      reading.prediction = 'Empathetic and insightful - Strong emotional intelligence';
      reading.detailedAnalysis.heart = {
        characteristic: 'Deep and prominent',
        meaning: 'You have strong emotional connections and are deeply passionate. You express your feelings openly and value meaningful relationships.'
      };
    } else {
      reading.prediction = 'Balanced emotions - Practical in relationships';
      reading.detailedAnalysis.heart = {
        characteristic: 'Moderate',
        meaning: 'You have a balanced approach to emotions, neither overly expressive nor reserved. You value both logic and feeling in relationships.'
      };
    }
    reading.lines.push('Heart Line');
  }
  
  // Head Line Analysis
  else if (dominantLine === 'head') {
    reading.lineType = 'Head Line Dominant';
    if (regions.middle.density > 0.15) {
      reading.prediction = 'Analytical and strategic thinker';
      reading.detailedAnalysis.head = {
        characteristic: 'Deep and clear',
        meaning: 'You possess strong analytical abilities and strategic thinking. You approach problems methodically and enjoy intellectual challenges.'
      };
    } else {
      reading.prediction = 'Intuitive and creative thinker';
      reading.detailedAnalysis.head = {
        characteristic: 'Curved and flowing',
        meaning: 'You have a creative mind and often trust your intuition. You think outside the box and enjoy exploring new ideas.'
      };
    }
    reading.lines.push('Head Line');
  }
  
  // Life Line Analysis
  else if (dominantLine === 'life') {
    reading.lineType = 'Life Line Dominant';
    if (regions.lower.density > 0.15) {
      reading.prediction = 'Determined and balanced - Strong vitality';
      reading.detailedAnalysis.life = {
        characteristic: 'Deep and sweeping',
        meaning: 'You have strong vitality and determination. You approach life with enthusiasm and have the energy to pursue your goals persistently.'
      };
    } else {
      reading.prediction = 'Adaptable and flexible lifestyle';
      reading.detailedAnalysis.life = {
        characteristic: 'Light and flexible',
        meaning: 'You are adaptable and go with the flow. You prefer flexibility in life and can easily adjust to changing circumstances.'
      };
    }
    reading.lines.push('Life Line');
  }
  
  // Fate Line Analysis
  else {
    reading.lineType = 'Fate Line Prominent';
    if (regions.thumb_side.density > 0.12) {
      reading.prediction = 'Strong sense of purpose and direction';
      reading.detailedAnalysis.fate = {
        characteristic: 'Present and defined',
        meaning: 'You have a clear sense of purpose and direction in life. You know what you want and work steadily towards your goals.'
      };
    } else {
      reading.prediction = 'Self-directed journey - Flexible path';
      reading.detailedAnalysis.fate = {
        characteristic: 'Absent or faint',
        meaning: 'You create your own path and prefer not to be bound by conventional expectations. You value freedom and self-direction.'
      };
    }
    reading.lines.push('Fate Line');
  }

  // Add analysis for other visible lines
  if (regions.upper.density > 0.10 && dominantLine !== 'heart') {
    reading.detailedAnalysis.heart = {
      characteristic: 'Visible',
      meaning: 'You are in touch with your emotions and value relationships.'
    };
    reading.lines.push('Heart Line');
  }

  if (regions.middle.density > 0.10 && dominantLine !== 'head') {
    reading.detailedAnalysis.head = {
      characteristic: 'Present',
      meaning: 'You have good mental clarity and decision-making abilities.'
    };
    reading.lines.push('Head Line');
  }

  if (regions.lower.density > 0.10 && dominantLine !== 'life') {
    reading.detailedAnalysis.life = {
      characteristic: 'Defined',
      meaning: 'You have steady energy and approach life with confidence.'
    };
    reading.lines.push('Life Line');
  }

  return reading;
}