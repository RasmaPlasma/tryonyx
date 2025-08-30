import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';

// Helper function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Test health endpoint
async function testHealth() {
  console.log('🏥 Testing health endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Health check passed:', data);
      return true;
    } else {
      console.log('❌ Health check failed:', response.status, data);
      return false;
    }
  } catch (error) {
    console.error('❌ Health check error:', error.message);
    return false;
  }
}

// Test invalid endpoint
async function testInvalidEndpoint() {
  console.log('\n🚫 Testing invalid endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/invalid`);
    if (response.status === 404) {
      console.log('✅ 404 handling works correctly');
      return true;
    } else {
      console.log('❌ Expected 404, got:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Invalid endpoint test error:', error.message);
    return false;
  }
}

// Test try-on endpoint
async function testTryOn(personImagePath, clothingImagePath) {
  console.log('\n👕 Testing try-on endpoint...');
  
  if (!fileExists(personImagePath)) {
    console.log(`❌ Person image not found: ${personImagePath}`);
    return false;
  }
  
  if (!fileExists(clothingImagePath)) {
    console.log(`❌ Clothing image not found: ${clothingImagePath}`);
    return false;
  }

  try {
    const form = new FormData();
    form.append('person', fs.createReadStream(personImagePath));
    form.append('clothing', fs.createReadStream(clothingImagePath));

    console.log('📤 Uploading images for try-on...');
    const response = await fetch(`${BASE_URL}/api/tryon`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Try-on test passed!');
      console.log('📸 Result URL:', data.resultUrl);
      return true;
    } else {
      console.log('❌ Try-on test failed:', response.status, data);
      return false;
    }
  } catch (error) {
    console.error('❌ Try-on test error:', error.message);
    return false;
  }
}

// Test clothing swap endpoint
async function testSwap(person1ImagePath, person2ImagePath) {
  console.log('\n🔄 Testing clothing swap endpoint...');
  
  if (!fileExists(person1ImagePath)) {
    console.log(`❌ Person1 image not found: ${person1ImagePath}`);
    return false;
  }
  
  if (!fileExists(person2ImagePath)) {
    console.log(`❌ Person2 image not found: ${person2ImagePath}`);
    return false;
  }

  try {
    const form = new FormData();
    form.append('person1', fs.createReadStream(person1ImagePath));
    form.append('person2', fs.createReadStream(person2ImagePath));

    console.log('📤 Uploading images for clothing swap...');
    const response = await fetch(`${BASE_URL}/api/swap`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Clothing swap test passed!');
      console.log('📸 Result URL:', data.resultUrl);
      console.log('📸 Original images:', data.originalImages);
      return true;
    } else {
      console.log('❌ Clothing swap test failed:', response.status, data);
      return false;
    }
  } catch (error) {
    console.error('❌ Clothing swap test error:', error.message);
    return false;
  }
}

// Test error handling - missing files
async function testMissingFiles() {
  console.log('\n🚨 Testing error handling for missing files...');
  
  try {
    const form = new FormData();
    // Only send person image, missing clothing
    form.append('person', Buffer.from('fake image data'));

    const response = await fetch(`${BASE_URL}/api/tryon`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    
    if (response.status === 400 && data.error) {
      console.log('✅ Error handling works correctly:', data.error);
      return true;
    } else {
      console.log('❌ Expected 400 error, got:', response.status, data);
      return false;
    }
  } catch (error) {
    console.error('❌ Error handling test error:', error.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🧪 Running comprehensive API tests...\n');
  
  const results = {
    health: await testHealth(),
    invalidEndpoint: await testInvalidEndpoint(),
    errorHandling: await testMissingFiles(),
  };

  // Test with actual images if they exist
  const testImagesDir = './test_script/test-images';
  const personImage = path.join(testImagesDir, 'person1.jpg');
  const clothingImage = path.join(testImagesDir, 'pants.jpg');
  const person1Image = path.join(testImagesDir, 'person1.jpg');
  const person2Image = path.join(testImagesDir, 'person2.jpg');

  if (fileExists(personImage) && fileExists(clothingImage)) {
    results.tryon = await testTryOn(personImage, clothingImage);
  } else {
    console.log('\n⚠️  Skipping try-on test - test images not found');
    console.log(`   Please add: ${personImage} and ${clothingImage}`);
  }

  // if (fileExists(person1Image) && fileExists(person2Image)) {
  //   results.swap = await testSwap(person1Image, person2Image);
  // } else {
  //   console.log('\n⚠️  Skipping swap test - test images not found');
  //   console.log(`   Please add: ${person1Image} and ${person2Image}`);
  // }

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });

  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
}

runAllTests();