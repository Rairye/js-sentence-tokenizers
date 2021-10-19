/*
Copyright 2021 Rairye
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

var breaks = new Set(["。", "！", "？", "．", ".", "?", "!"]);
var closingPunctuation = new Set([")", "]", "}", "）", "」", "】", "』", "｝", "〕", ">", "＞", "》", "〉", "］", "﹂", "\"", ")", "]", ">", "}"]);
var numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", , "０", "１", "２", "３", "４", "５", "６", "７", "８", "９"])

function isBreak(char) {
    return breaks.has(char);
		
	}

function isClosingPunct(char) {
    return closingPunctuation.has(char);
	
	}
	
function isNumeric(char){
	return numbers.has(char);
	
	}

export default function tokenizeKoreanParagraph(paragraph){

        if (!typeof paragraph == "string") {
            return [];
		
		}

        if (paragraph.length == 0) {
            return [];
	
		}
    
        var lastCategory = "";
        var sentences = [];
        var i = 0;
        var j = 0;
        var length = paragraph.length;

        while (j < length) {
                var currentChar = paragraph.charAt(j);
                var currentCategory = isBreak(currentChar) == true ? "BREAK" : "NOTBREAK";
				
                if (lastCategory == "BREAK" && currentCategory == "NOTBREAK") {
                    
                        if (!(isClosingPunct(currentChar) && !(isNumeric(currentChar)))) {
                                sentences.push(paragraph.substring(i, j).trim());
                                lastCategory = "";
								currentCategory = "";
                                i = j;
                                j++;
								
						}
                                                             
                        else {
                                lastCategory = "BREAK";
                                j++;
				
						}		
								
				}
                                
                else if (currentCategory == "BREAK" && j < length -1) {
                        j++;
                        lastCategory = currentCategory;
						
				}

                else if (j == length - 1) {
                     sentences.push(paragraph.substring(i).trim());
                     j++;
                     
				}
				
                else {
                     j++;
                     lastCategory = currentCategory;
					 
				}
        
		}
		
        return sentences;
		
	}
	