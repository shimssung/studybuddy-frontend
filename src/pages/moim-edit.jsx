import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { CATEGORY_OPTIONS } from "../utils/constants";

const MoimEdit = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "시크릿 가든 북클럽",
    category: "book",
    maxMembers: 12,
    description: "시크릿 가든을 함께 읽고 토론하는 북클럽입니다.",
    location: "서울시 강남구",
    meetingCycle: "weekly",
    meetingDay: "수요일",
    meetingTime: "14:00",
    tags: ["독서", "토론", "문학"],
    thumbnail:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    onlineType: "offline",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("모임 정보가 성공적으로 수정되었습니다!");
    // TODO: API 연동
    router.push("/my-moims");
  };

  const handleCancel = () => {
    router.push("/my-moims");
  };

  const getMeetingCycleText = () => {
    switch (formData.meetingCycle) {
      case "weekly":
        return "매주";
      case "biweekly":
        return "격주";
      case "monthly":
        return "매월";
      default:
        return "";
    }
  };

  return (
    <PageContainer>
      <Header />
      <Container>
        <LeftSection>
          <FormContainer>
            <FormTitle>모임 정보 수정</FormTitle>
            <FormDescription>
              모임의 기본 정보를 수정할 수 있습니다. 일정 관련 정보는 모임 내 일정 관리에서 설정하세요.
            </FormDescription>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">모임명 *</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="모임 이름을 입력해주세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="category">카테고리 *</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="maxMembers">최대 인원 *</Label>
                <Input
                  type="number"
                  id="maxMembers"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  min="2"
                  max="100"
                  placeholder="2-100명"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">모임 소개 *</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="모임에 대해 설명해주세요. 어떤 활동을 하는지, 누구를 위한 모임인지 알려주세요."
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="onlineType">모임 형태</Label>
                <Select
                  id="onlineType"
                  name="onlineType"
                  value={formData.onlineType}
                  onChange={handleChange}
                  required
                >
                  <option value="online">온라인</option>
                  <option value="offline">오프라인</option>
                </Select>
              </FormGroup>

              {formData.onlineType === "offline" && (
                <FormGroup>
                  <Label htmlFor="location">활동 지역</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              )}

              <FormRow>
                <FormGroup>
                  <Label htmlFor="meetingCycle">모임 주기</Label>
                  <Select
                    id="meetingCycle"
                    name="meetingCycle"
                    value={formData.meetingCycle}
                    onChange={handleChange}
                    required
                  >
                    <option value="weekly">매주</option>
                    <option value="biweekly">격주</option>
                    <option value="monthly">매월</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="meetingDay">모임 요일</Label>
                  <Select
                    id="meetingDay"
                    name="meetingDay"
                    value={formData.meetingDay}
                    onChange={handleChange}
                    required
                  >
                    <option value="월요일">월요일</option>
                    <option value="화요일">화요일</option>
                    <option value="수요일">수요일</option>
                    <option value="목요일">목요일</option>
                    <option value="금요일">금요일</option>
                    <option value="토요일">토요일</option>
                    <option value="일요일">일요일</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="meetingTime">모임 시간</Label>
                <Input
                  type="time"
                  id="meetingTime"
                  name="meetingTime"
                  value={formData.meetingTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>태그</Label>
                <TagContainer>
                  {formData.tags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                      <RemoveButton
                        onClick={() => {
                          const newTags = [...formData.tags];
                          newTags.splice(index, 1);
                          setFormData((prev) => ({ ...prev, tags: newTags }));
                        }}
                      >
                        ×
                      </RemoveButton>
                    </Tag>
                  ))}
                  <TagInput
                    placeholder="태그 입력 후 Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const newTag = e.target.value.trim();
                        if (newTag && !formData.tags.includes(newTag)) {
                          setFormData((prev) => ({
                            ...prev,
                            tags: [...prev.tags, newTag],
                          }));
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                </TagContainer>
              </FormGroup>

              <FormGroup>
                <Label>모임 대표 이미지</Label>
                <FileInputContainer>
                  <FileInput
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            thumbnail: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <FileInputLabel htmlFor="thumbnail">파일 선택</FileInputLabel>
                </FileInputContainer>
                {formData.thumbnail && (
                  <CurrentImageContainer>
                    <CurrentImageLabel>현재 이미지:</CurrentImageLabel>
                    <CurrentImage src={formData.thumbnail} alt="현재 모임 이미지" />
                  </CurrentImageContainer>
                )}
              </FormGroup>

              <ButtonGroup>
                <Button variant="secondary" type="button" onClick={handleCancel}>
                  취소
                </Button>
                <Button variant="primary" type="submit">
                  수정 완료
                </Button>
              </ButtonGroup>
            </Form>
          </FormContainer>
        </LeftSection>

        <RightSection>
          <PreviewContainer>
            <PreviewTitle>미리보기</PreviewTitle>
            <PreviewContent>
              <PreviewHeader>
                <PreviewImageSection>
                  <PreviewImageContainer>
                    {formData.thumbnail ? (
                      <PreviewImage
                        src={formData.thumbnail}
                        alt="모임 대표 이미지"
                      />
                    ) : (
                      <PreviewImagePlaceholder>
                        이미지 미리보기
                      </PreviewImagePlaceholder>
                    )}
                  </PreviewImageContainer>
                </PreviewImageSection>
              </PreviewHeader>

              <PreviewName>{formData.title || "모임 제목"}</PreviewName>
              <PreviewMaxMembers>
                최대 {formData.maxMembers || "0"}명
              </PreviewMaxMembers>
              <PreviewInfo>
                <InfoItem>
                  <InfoLabel>모임 형태</InfoLabel>
                  <InfoValue>
                    {formData.onlineType === "online" ? "온라인" : "오프라인"}
                  </InfoValue>
                </InfoItem>
                {formData.onlineType === "offline" && (
                  <InfoItem>
                    <InfoLabel>활동 지역</InfoLabel>
                    <InfoValue>{formData.location}</InfoValue>
                  </InfoItem>
                )}
                <InfoItem>
                  <InfoLabel>정기 모임</InfoLabel>
                  <InfoValue>
                    {getMeetingCycleText()} {formData.meetingDay}{" "}
                    {formData.meetingTime}
                  </InfoValue>
                </InfoItem>
              </PreviewInfo>

              <PreviewDescription>
                {formData.description || "모임 설명이 여기에 표시됩니다."}
              </PreviewDescription>

              <PreviewTags>
                {formData.tags.length > 0 ? (
                  formData.tags.map((tag, index) => (
                    <PreviewTag key={index}>{tag}</PreviewTag>
                  ))
                ) : (
                  <PreviewTag>#태그</PreviewTag>
                )}
              </PreviewTags>
            </PreviewContent>
          </PreviewContainer>
        </RightSection>
      </Container>
    </PageContainer>
  );
};

export default MoimEdit;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 16px 60px 16px;
  display: flex;
  gap: 48px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightSection = styled.div`
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  min-height: 42px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #374151;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #ef4444;
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #111827;
  padding: 4px;
  flex: 1;
  min-width: 120px;

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const PreviewContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 32px;
`;

const PreviewTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PreviewImageSection = styled.div`
  margin-top: 24px;
`;

const PreviewImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
`;

const PreviewName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const PreviewMaxMembers = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PreviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 8px;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: #111827;
`;

const PreviewDescription = styled.p`
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
`;

const PreviewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PreviewTag = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const CurrentImageContainer = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const CurrentImageLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
`;

const CurrentImage = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #d1d5db;
`;

const FormDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;
